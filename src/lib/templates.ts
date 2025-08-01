import type { Template } from '@/lib/types';
import { FileText, Mail, Share2 } from 'lucide-react';

export const templates: Template[] = [
  {
    id: 'resume',
    name: 'Professional Resume',
    description: 'A clean, modern resume template for job applications.',
    category: 'Professional',
    icon: FileText,
    fields: [
      { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john.doe@example.com' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(123) 456-7890' },
      { name: 'address', label: 'Address', type: 'text', placeholder: '123 Main St, Anytown, USA' },
      { name: 'summary', label: 'Professional Summary', type: 'textarea', placeholder: 'A brief summary of your skills and experience...' },
      { name: 'experience', label: 'Work Experience', type: 'textarea', placeholder: 'Detail your work history here...' },
      { name: 'education', label: 'Education', type: 'textarea', placeholder: 'Your educational background...' },
      { name: 'skills', label: 'Skills', type: 'textarea', placeholder: 'List your relevant skills...' },
    ],
  },
  {
    id: 'cover-letter',
    name: 'Cover Letter',
    description: 'A formal cover letter template to accompany your resume.',
    category: 'Professional',
    icon: Mail,
    fields: [
      { name: 'fullName', label: 'Your Full Name', type: 'text', placeholder: 'John Doe' },
      { name: 'email', label: 'Your Email', type: 'email', placeholder: 'john.doe@example.com' },
      { name: 'phone', label: 'Your Phone Number', type: 'tel', placeholder: '(123) 456-7890' },
      { name: 'date', label: 'Date', type: 'text', placeholder: new Date().toLocaleDateString('en-US') },
      { name: 'recipientName', label: 'Recipient Name', type: 'text', placeholder: 'Jane Smith' },
      { name: 'recipientTitle', label: 'Recipient Title', type: 'text', placeholder: 'Hiring Manager' },
      { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'Innovate Corp' },
      { name: 'body', label: 'Letter Body', type: 'textarea', placeholder: 'Write the main content of your cover letter here...' },
    ],
  },
  {
    id: 'social-media-post',
    name: 'Social Media Post',
    description: 'A template for crafting engaging social media posts.',
    category: 'Marketing',
    icon: Share2,
    fields: [
      { name: 'postContent', label: 'Post Content', type: 'textarea', placeholder: 'What\'s on your mind?' },
      { name: 'hashtags', label: 'Hashtags', type: 'text', placeholder: '#innovation #technology #future' },
      { name: 'callToAction', label: 'Call to Action', type: 'text', placeholder: 'Learn more at our website!' },
      { name: 'platform', label: 'Platform', type: 'text', placeholder: 'e.g., Twitter, LinkedIn, Instagram' },
    ],
  },
];

export const findTemplateById = (id: string): Template | undefined => {
    return templates.find(t => t.id === id);
}
