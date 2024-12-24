import { z } from 'zod';

export const BookGetIdSchema = z.object({
  id: z.string().trim().refine((val) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(val);
  }, "Invalid UUID format"),
});

export type BookGetIdDTO = z.infer<typeof BookGetIdSchema>;

export const parseBookGetIdPayload = (data: Record<string, any>): BookGetIdDTO => {
  return BookGetIdSchema.parse(data);
};