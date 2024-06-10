import { date, z } from "zod";

export const StudentSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." }),
  email: z.string().email(),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters long." }),
  address: z.string().min(5, {}),

  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long." }),
  gender: z.string(),
  level: z.string(),
  school: z.string(),
  dateOfBirth: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: "Start date should be in the format YYYY-MM-DD",
  }),
  parent_name: z.string().optional(),
  parent_phone: z.string().optional(),
  parent_email: z.string().email().optional(),
  parent_address: z.string().optional(),
  parent_country: z.string().optional(),
});
export type StudentSchemaType = z.infer<typeof StudentSchema>;
