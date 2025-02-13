export interface Page {
  id: number;
  english: string[] | string;
  korean: string | null;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  path: string;
  image: string;
  pages: Page[];
}
