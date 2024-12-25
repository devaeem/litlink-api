import { GetAllRequestDto, PaginatedResponse } from "@/utils/interface/GetAllRequestDto.interface";
import { BookRepository } from "./BookRepository";
import { IBookCreateReqDto, IBookGetIdReqDto, IBookReqDto, IBookUpdateReqDto } from "./dtos/bookReq.dto";
import { Book } from "./entity/book.models";
import { IBookResDto } from "./dtos/bookRes.dto";
export class BookService {

  private _repository: BookRepository;

  constructor() {
    this._repository = new BookRepository();
  }

 public async getAll(dto: IBookReqDto):Promise<PaginatedResponse<IBookResDto>> {
  console.log('dto', dto);

  return await this._repository.findWithCustomPagination(dto.page, dto.limit, dto.populate, dto.search, dto.sort);
}

public async getById(dto: IBookGetIdReqDto):Promise<IBookResDto | null>   {
  return await this._repository.findById(dto.id);
}

public async create(dto: IBookCreateReqDto):Promise<IBookResDto> {
  return await this._repository.create(dto);
}

public async update(dto: IBookUpdateReqDto, u: IBookGetIdReqDto):Promise<IBookResDto | null> {
  return await this._repository.update(u.id, dto);
}

public async delete(d: IBookGetIdReqDto):Promise<boolean> {
  return await this._repository.delete(d.id);
}







}