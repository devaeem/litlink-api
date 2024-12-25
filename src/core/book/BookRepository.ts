import { PaginatedResponse } from "@/utils/interface/GetAllRequestDto.interface";
import { BaseRepository } from "../../repositories/BaseRepository";
import { BookModel, IBook } from "./entity/book.models";

interface ISortFilter {
  [key: string]: number;
}

interface ISearchFilter {
  $or?: {
    [key: string]: {
      $regex: string;
      $options: string;
    };
  }[];
}

export class BookRepository extends BaseRepository<IBook> {
  constructor() {
    super(BookModel);
  }

  async findWithCustomPagination(
    page: number,
    limit: number,
    populate?: string[] | undefined,
    search?: string,
    sort?: string,
  ): Promise<PaginatedResponse<IBook>> {
    const searchFilter: ISearchFilter = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        }
      : {};
      const sortFilter : ISortFilter = sort
      ? {
        [sort]: 1
      }
      : {};

    return await super.findWithPagination(page, limit, populate, searchFilter, sortFilter);
  }
}