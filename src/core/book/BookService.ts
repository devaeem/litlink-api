import { GetAllRequestDto, PaginatedResponse } from "@/utils/interface/GetAllRequestDto.interface";
import { BookRepository } from "./BookRepository";
import { BookDTO } from "./dtos/bookReq.dto";
import { Book } from "./entity/book.models";
export class BookService {

  private repository: BookRepository;

  constructor() {
    this.repository = new BookRepository();
  }

 public async getAll(dto: GetAllRequestDto):Promise<PaginatedResponse<Book>> {
  console.log('dto', dto);

  return await this.repository.findWithPagination(dto.page, dto.limit, dto.populate);
}

public async getById(id: string):Promise<Book | null>   {
  return await this.repository.findById(id);
}

public async create(dto: BookDTO):Promise<Book> {
  return await this.repository.create(dto);
}

public async update(dto: BookDTO, id: string):Promise<Book | null> {
  return await this.repository.update(id, dto);
}

public async delete(id: string):Promise<boolean> {
  return await this.repository.delete(id);
}







}