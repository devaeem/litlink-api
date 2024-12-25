import { z } from 'zod';

export const typebookSchema = z.object({
  name: z.string().min(1).trim().refine((val) => val.length > 0, {
    message: "Name cannot be empty",
  }),
  description: z.string(),
  // status: z.boolean().optional(),
});

export type ITypebookValidate = z.infer<typeof typebookSchema>;

export const parseTypebookCreatePayload = (data: Record<string, any>): ITypebookValidate => {
 return typebookSchema.parse(data);
};

export const parseTypebookUpdatePayload = (data: Record<string, any>): Partial<ITypebookValidate> => {
  return typebookSchema.partial().parse(data);
};


export const TypebookGetIdSchema = z.object({
 id: z.string().trim().refine((val) => {
   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
   return uuidRegex.test(val);
 }, "Invalid UUID format"),
});


export type ITypebookGetIdValidate = z.infer<typeof TypebookGetIdSchema>;




export const parseTypebookGetIdPayload = (data: Record<string, any>): ITypebookGetIdValidate => {
 return TypebookGetIdSchema.parse(data);
};

// export const parseTypebookCreatePayload = (data: Record<string, any>): ITypebookValidate => {
//  return typebookSchema.parse(data);
// };

// export const parseTypebookUpdatePayload = (data: Record<string, any>): Partial<ITypebookValidate> => {
//   return typebookSchema.partial().parse(data);
// };




