import { z } from 'zod';


export interface IBookReqDto {
  page: number;
  limit: number;
  populate?: string[] | undefined;
  sort?: string;
  sortBy?: string;
  search?: string;
 }

export interface IBookCreateReqDto {
  title: string;
  author: string;
  publishedYear: number;
}

export interface IBookUpdateReqDto extends IBookCreateReqDto {


}

export interface IBookGetIdReqDto {
  id: string;
}

export const BookSchema = z.object({
  title: z.string().min(1).trim(),
  author: z.string().min(1).trim(),
  publishedYear: z.number().min(1),
  isbn: z.string().min(1).trim(),
  typeBook: z.string().min(1).trim(),
});

export type IBookDTO = z.infer<typeof BookSchema>;

export const parseBookPayload = (data: Record<string, any>): IBookDTO => {
  return BookSchema.parse(data);
};

export const parseBookCreatePayload = (data: Record<string, any>): IBookDTO => {
  return BookSchema.parse(data);
};

export const parseBookUpdatePayload = (data: Record<string, any>): IBookDTO => {
  return BookSchema.parse(data);
};

export const parseBookGetIdPayload = (data: Record<string, any>): IBookDTO => {
  return BookSchema.parse(data);
};


