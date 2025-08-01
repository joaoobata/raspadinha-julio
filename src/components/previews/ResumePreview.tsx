import type { TemplateData } from "@/lib/types";

export function ResumePreview({ data }: { data: TemplateData }) {
  return (
    <div className="p-8 font-sans text-sm bg-white text-gray-800">
      <header className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{data.fullName || "Your Name"}</h1>
        <p className="text-base text-gray-600 mt-2">
          {data.email || "your.email@example.com"} | {data.phone || "(123) 456-7890"} | {data.address || "Your Address"}
        </p>
      </header>

      <section>
        <h2 className="text-xl font-bold text-primary border-b border-gray-200 pb-1 mb-2">Summary</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{data.summary || "Your professional summary..."}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold text-primary border-b border-gray-200 pb-1 mb-2">Work Experience</h2>
        <div className="text-gray-700 whitespace-pre-wrap">{data.experience || "Your work experience..."}</div>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold text-primary border-b border-gray-200 pb-1 mb-2">Education</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{data.education || "Your educational background..."}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold text-primary border-b border-gray-200 pb-1 mb-2">Skills</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{data.skills || "Your list of skills..."}</p>
      </section>
    </div>
  );
}
