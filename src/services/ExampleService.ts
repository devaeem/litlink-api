import { GetAllRequestDto } from "../utils/interface/GetAllRequestDto.interface";
import { ExampleRepository } from "../repositories/ExampleRepository";


export class ExampleService {
  private repository: ExampleRepository;

  constructor() {
    this.repository = new ExampleRepository();
  }

  public async getAll(dto: GetAllRequestDto) {
    return await this.repository.findWithPagination(dto.page, dto.limit);
  }

  public async create(data: any) {
    return await this.repository.create(data);
  }

}
