import { z } from 'zod';

// Pagination schema definition
export const PaginationSchema = z.object({
  page: z
    .number()
    .int()
    .positive()
    .optional()
    .default(1)
    .transform((val) => Number(val)),
  limit: z
    .number()
    .int()
    .positive()
    .optional()
    .default(10)
    .transform((val) => Number(val))
    .refine((val) => val <= 100, {
      message: 'Limit cannot exceed 100 items per page',
    }),
});

// Type inference from the schema
export type PaginationDto = z.infer<typeof PaginationSchema>;

// Helper function to parse pagination query params
export const parsePaginationQuery = (query: Record<string, any>): PaginationDto => {
  return PaginationSchema.parse({
    page: query.page ? Number(query.page) : undefined,
    limit: query.limit ? Number(query.limit) : undefined,
  });
}; 