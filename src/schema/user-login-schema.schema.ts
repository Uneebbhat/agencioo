import z from "zod";

const UserLoginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters" })
    .max(50, { error: "Password must be at most 50 characters" }),
});

export default UserLoginSchema;
