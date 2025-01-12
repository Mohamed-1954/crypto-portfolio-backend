import { users } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const authSchema = createInsertSchema(users, {
  email: (schema) =>
    schema.email({
      message: "Email is required",
    }),
  password: (schema) =>
    schema
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character (@$!%*?&#)"
      )
      .max(64, "Password cannot exceed 64 characters"),
});

export const requestUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
}).required();

export type AuthSchema = z.infer<typeof authSchema>;
export type RequestUserSchema = z.infer<typeof requestUserSchema>;