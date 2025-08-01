export type TemplateField = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'email' | 'tel';
  placeholder?: string;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: TemplateField[];
};

export type TemplateData = {
  [key: string]: string;
};
