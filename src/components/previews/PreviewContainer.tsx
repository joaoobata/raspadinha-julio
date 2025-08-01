import type { TemplateData } from "@/lib/types";
import { ResumePreview } from "./ResumePreview";
import { CoverLetterPreview } from "./CoverLetterPreview";
import { SocialPostPreview } from "./SocialPostPreview";

type PreviewContainerProps = {
  templateId: string;
  data: TemplateData;
};

export function PreviewContainer({ templateId, data }: PreviewContainerProps) {
  const renderPreview = () => {
    switch (templateId) {
      case 'resume':
        return <ResumePreview data={data} />;
      case 'cover-letter':
        return <CoverLetterPreview data={data} />;
      case 'social-media-post':
        return <SocialPostPreview data={data} />;
      default:
        return <div className="text-center p-8">Preview not available for this template.</div>;
    }
  };

  return <div className="aspect-[8.5/11] w-full bg-white text-black rounded-md shadow-lg overflow-auto">{renderPreview()}</div>;
}
