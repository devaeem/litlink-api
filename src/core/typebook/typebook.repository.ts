import { PaginatedResponse } from "@/utils/interface/GetAllRequestDto.interface";
import { BaseRepository } from "../../repositories/BaseRepository";
import { ITypebook, TypebookModel } from "./entity/typebook.models";

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

export class TypeBookRepository extends BaseRepository<ITypebook> {
  constructor() {
    super(TypebookModel);
  }

  async findWithCustomPagination(
   page: number,
   limit: number,
   populate?: string[] | undefined,
   search?: string,
   sort?: string,
 ): Promise<PaginatedResponse<ITypebook>> {
   const searchFilter: ISearchFilter = search
     ? {
         $or: [
           { name: { $regex: search, $options: "i" } },
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