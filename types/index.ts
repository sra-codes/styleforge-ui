export interface UIComponent {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  html: string;
  css: string;
  js: string;
  react?: string;
  createdAt: number;
  updatedAt: number;
}

export const CATEGORIES = [
  "Buttons",
  "Cards",
  "Inputs",
  "Loaders",
  "Animations",
  "Hover Effects",
  "Layouts",
  "Text Effects",
  "Misc Components",
];
