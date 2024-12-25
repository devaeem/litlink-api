import { ITypebook } from "../entity/typebook.models";

export interface ITypebookReqDto {
 page: number;
 limit: number;
 populate?: string[] | undefined;
 sort?: string;
 sortBy?: string;
 search?: string;
}

export interface ITypebookDto extends ITypebook {
  name: string;
  description: string;
}
