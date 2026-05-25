import { z } from "zod";

export const createUserWithEmailAndPasswordInput = z.object({
  fullName: z.string().describe("The user's first name"),
  email: z.email().describe("The user's email address"),
  password: z.string().describe("The user's password"),
});

export type CreateUserWithEmailAndPasswordInput = z.infer<
  typeof createUserWithEmailAndPasswordInput
>;
