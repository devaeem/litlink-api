import { z } from 'zod';

export const BookSchema = z.object({
  title: z.string().min(1).trim(),
  author: z.string().min(1).trim(),
  publishedYear: z.number().min(1),
});

export type BookDTO = z.infer<typeof BookSchema>;

export const parseBookPayload = (data: Record<string, any>): BookDTO => {
  return BookSchema.parse(data);
};

export const parseBookCreatePayload = (data: Record<string, any>): BookDTO => {
  return BookSchema.parse(data);
};

export const parseBookUpdatePayload = (data: Record<string, any>): BookDTO => {
  return BookSchema.parse(data);
};

export const parseBookGetIdPayload = (data: Record<string, any>): BookDTO => {
  return BookSchema.parse(data);
};


