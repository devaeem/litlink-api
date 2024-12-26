import { IBook } from "../entity/book.models";

export interface IBookResDto extends IBook {
  title: string;
  author: string;
  publishedYear: number;
  isbn: string;

}
