import { PaginatedResponse } from "@/utils/interface/GetAllRequestDto.interface";
import { TypeBookRepository } from "./typebook.repository";
import {
  ITypebookCreateReqDto,
  ITypebookUpdateReqDto,
} from "./dtos/typebookreq.dto";
import {
  ITypebookDto,
  ITypebookReqDto,
} from "./dtos/typebookres.dto";
import { GetId } from "./dtos/typebookgetId.dto";

export class TypeBookService {
  private _repository: TypeBookRepository;

  constructor() {
    this._repository = new TypeBookRepository();
  }

  public async getAll(
    dto: ITypebookReqDto
  ): Promise<PaginatedResponse<ITypebookDto>> {
    return await this._repository.findWithCustomPagination(
      dto.page,
      dto.limit,
      dto.populate,
      dto.search,
      dto.sort
    );
  }

  public async create(dto: ITypebookCreateReqDto): Promise<ITypebookDto> {
    return await this._repository.create(dto);
  }


  public async update(dto: ITypebookUpdateReqDto, u: GetId):Promise<ITypebookDto | null> {
    return await this._repository.update(u.id, dto);
  }

  public async getById(id: GetId): Promise<ITypebookDto | null> {
    return await this._repository.findById(id.id);
  }

  public async delete(d: GetId): Promise<boolean> {
    return await this._repository.delete(d.id);
  }
}
