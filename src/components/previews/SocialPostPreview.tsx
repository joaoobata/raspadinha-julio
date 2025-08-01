import type { TemplateData } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";

export function SocialPostPreview({ data }: { data: TemplateData }) {
  return (
    <div className="p-4 font-sans bg-white">
      <div className="border rounded-xl p-4 max-w-lg mx-auto bg-white text-gray-800">
        <div className="flex items-start space-x-3">
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="User avatar" data-ai-hint="person" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-1">
              <span className="font-bold">You</span>
              <span className="text-gray-500">@you · 1m</span>
            </div>
            <p className="mt-1 whitespace-pre-wrap">{data.postContent || "Your post content will appear here..."}</p>
            <p className="mt-2 text-primary">{data.hashtags || "#hashtags"}</p>
            {data.callToAction && (
                <div className="mt-3 border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    <p className="font-semibold text-primary">{data.callToAction}</p>
                    <p className="text-sm text-gray-500">yourwebsite.com</p>
                </div>
            )}
             <div className="flex justify-between items-center text-gray-500 mt-4 pt-2 -ml-2">
                <div className="flex items-center space-x-1 p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer">
                    <MessageCircle size={20} />
                    <span className="text-sm">12</span>
                </div>
                <div className="flex items-center space-x-1 p-2 rounded-full hover:bg-green-100 hover:text-green-500 cursor-pointer">
                    <Repeat size={20} />
                    <span className="text-sm">5</span>
                </div>
                <div className="flex items-center space-x-1 p-2 rounded-full hover:bg-pink-100 hover:text-pink-500 cursor-pointer">
                    <Heart size={20} />
                    <span className="text-sm">42</span>
                </div>
                 <div className="p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 cursor-pointer">
                    <Share size={20} />
                 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
