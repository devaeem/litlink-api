
import { BaseRepository } from "../../repositories/BaseRepository";
import { BookModel, IBook } from "./entity/book.models";


export class BookRepository extends BaseRepository<IBook> {
  constructor() {
    super(BookModel);
  }
}