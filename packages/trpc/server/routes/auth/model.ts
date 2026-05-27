import { z } from "zod";

export const createUserWithEmailAndPasswordInputModel = z.object({
  fullName: z.string().describe("User's full name").min(2).max(100),
  email: z.email().describe("User's email address"),
  password: z.string().describe("User's password").min(6).max(100),
});

export const createUserWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("Unique identifier for the user"),
});

export const signInUserWithEmailAndPasswordInputModel = z.object({
  email: z.email().describe("User's email address"),
  password: z.string().describe("User's password").min(6).max(100),
});

export const signInUserWithEmailAndPasswordOutputModel = z.object({
  id: z.string().describe("Unique identifier for the user"),
});

export const getCurrentUserInfoInput = z.undefined();

export const getCurrentUserInfoOutputModel = z.object({
  id: z.string().describe("Unique identifier for the user"),
  fullName: z.string().describe("User's full name").min(2).max(100),
  email: z.email().describe("User's email address"),
  profileImageUrl: z.string().describe("URL of the user's profile picture").optional().nullable(),
});

export const signOutInputModel = z.undefined();

export const signOutOutputModel = z.object({
  success: z.boolean(),
});
