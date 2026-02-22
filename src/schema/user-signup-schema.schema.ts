import { z } from "zod";

const UserSignupSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(3, { error: "Name must be at least 3 characters long" })
    .max(20, { error: "Name must be at most 20 characters long" }),
  email: z
    .string({ error: "Email is required" })
    .email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters" })
    .max(50, { error: "Password must be at most 50 characters" }),
});

export default UserSignupSchema;
