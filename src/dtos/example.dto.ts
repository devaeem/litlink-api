import { z } from "zod";

// Create schema definition
export const CreateExampleSchema = z.object({
  // Add your fields here with appropriate validation
  // For example:
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }).min(1, "Name cannot be empty"),
  description: z.string().optional(),
  // Add more fields as needed
});

// Type inference from the schema
export type CreateExampleDto = z.infer<typeof CreateExampleSchema>;

// Helper function to parse create payload
export const parseExamplePayload = (
  data: Record<string, any>
): CreateExampleDto => {
  return CreateExampleSchema.parse(data);
};