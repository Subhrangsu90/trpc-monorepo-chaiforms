import { z } from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
  fullName: z.string().describe("User's full name").min(2).max(100),
  email: z.email().describe("User's email address"),
  password: z.string().describe("User's password").min(6).max(100),
});

export const createUserWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("Unique identifier for the user"),
});
