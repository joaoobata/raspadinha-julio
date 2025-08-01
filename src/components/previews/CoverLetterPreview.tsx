import type { TemplateData } from "@/lib/types";

export function CoverLetterPreview({ data }: { data: TemplateData }) {
  return (
    <div className="p-10 font-serif text-base bg-white text-gray-900 leading-relaxed">
      <div className="text-right mb-12">
        <h1 className="text-3xl font-bold">{data.fullName || "Your Name"}</h1>
        <p>{data.email || "your.email@example.com"}</p>
        <p>{data.phone || "(123) 456-7890"}</p>
      </div>

      <div>
        <p>{data.date || new Date().toLocaleDateString('en-US')}</p>
        <br />
        <p>{data.recipientName || "Recipient Name"}</p>
        <p>{data.recipientTitle || "Recipient Title"}</p>
        <p>{data.companyName || "Company Name"}</p>
      </div>

      <div className="mt-10">
        <p className="whitespace-pre-wrap">{data.body || "Your letter body..."}</p>
      </div>

      <div className="mt-12">
        <p>Sincerely,</p>
        <br />
        <br />
        <p>{data.fullName || "Your Name"}</p>
      </div>
    </div>
  );
}
