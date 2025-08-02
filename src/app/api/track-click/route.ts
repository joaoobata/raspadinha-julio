
'use server';

import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/lib/firebase-admin-init';
import { FieldValue } from 'firebase-admin/firestore';
import { logSystemEvent } from '@/lib/logging';

function getDeviceType(userAgent: string | null): 'Desktop' | 'Mobile' | 'Other' {
    if (!userAgent) return 'Other';
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return 'Mobile'; // Tablets are often considered mobile for marketing purposes
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
        return 'Mobile';
    }
    return 'Desktop';
}


export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const affiliateId = searchParams.get('ref');

    // Determine the correct base URL for redirection
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;

    // If no ref, just redirect to home, preserving other query params
    if (!affiliateId) {
        const homeUrl = new URL('/', baseUrl);
        searchParams.forEach((value, key) => {
             if (key !== 'ref') {
                homeUrl.searchParams.set(key, value);
             }
        });
        return NextResponse.redirect(homeUrl);
    }

    try {
        const adminDb = getAdminDb();
        const userAgent = request.headers.get('user-agent');
        
        const clickLog = {
            affiliateId,
            timestamp: new Date(), // Use a standard Date object to avoid serialization issues with Server Components.
            userAgent: userAgent,
            deviceType: getDeviceType(userAgent),
            ip: request.headers.get('x-forwarded-for') ?? request.ip,
            utm_source: searchParams.get('utm_source'),
            utm_medium: searchParams.get('utm_medium'),
            utm_campaign: searchParams.get('utm_campaign'),
            utm_term: searchParams.get('utm_term'),
            utm_content: searchParams.get('utm_content'),
            cid: searchParams.get('cid'),
        };

        // When writing to Firestore, use the server timestamp for accuracy.
        await adminDb.collection('affiliate_clicks').add({
            ...clickLog,
            timestamp: FieldValue.serverTimestamp() 
        });
        
        // Log the event with the plain object.
        await logSystemEvent(affiliateId, 'system', 'AFFILIATE_CLICK_TRACKED', clickLog, 'SUCCESS');


    } catch (error) {
        // Log the error but don't block the redirect
        console.error("Failed to log affiliate click:", error);
         await logSystemEvent(affiliateId, 'system', 'AFFILIATE_CLICK_FAIL', { error: (error as Error).message }, 'ERROR');
    }
    
    // Create the final redirect URL to the homepage using the correct base URL
    const redirectUrl = new URL('/', baseUrl);
    
    // Append the entire original search string to the new URL.
    redirectUrl.search = searchParams.toString();
    
    return NextResponse.redirect(redirectUrl);
}
