import { z } from "zod";

// Pagination schema definition
export const PaginationSchema = z.object({
  page: z
    .number({
      required_error: "Page number is required", // เพิ่มข้อความเมื่อไม่มีการระบุค่า
      invalid_type_error: "Page must be a number",
    })
    .int()
    .positive()

    .transform((val) => Number(val))
    .refine((val) => val >= 1, {
      message: "Page cannot be less than 1",
    }),
  limit: z
    .number({
      required_error: "Limit number is required",
      invalid_type_error: "Limit must be a number",
    })
    .int()
    .positive()

    .transform((val) => Number(val))
    .refine((val) => val <= 1000, {
      message: "Limit cannot exceed 1000 items per page",
    }),
  populate: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      if (typeof val === 'string') return val;
      return val.join(',');
    }),
});

// Type inference from the schema
export type PaginationDto = z.infer<typeof PaginationSchema>;

// Helper function to parse pagination query params
export const parsePaginationQuery = (
  query: Record<string, any>
): PaginationDto => {
  return PaginationSchema.parse({
    page: query.page ? Number(query.page) : undefined,
    limit: query.limit ? Number(query.limit) : undefined,
    populate: query.populate ? query.populate : undefined,
  });
};
