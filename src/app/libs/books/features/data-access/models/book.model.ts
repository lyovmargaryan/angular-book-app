export interface IBookModel {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: number;
  language: BookLanguage;
  genre: string;
}

export enum BookLanguage {
  English = 'english',
  Chinese = 'chinese',
  French = 'french',
  Russian = 'russian',
  Armenian = 'armenian',
}

