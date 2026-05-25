import { userService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { getAuthCookie, setAuthCookie } from "../../utils/cookie";
import { generatePath } from "../../utils/path-generator";
import {
  createUserWithEmailAndPasswordInputModel,
  createUserWithEmailAndPasswordOutputModel,
  getCurrentUserInfoInput,
  getCurrentUserInfoOutputModel,
  signInUserWithEmailAndPasswordInputModel,
  signInUserWithEmailAndPasswordOutputModel,
} from "./model";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  createUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/create-user"),
        tags: TAGS,
        summary: "Create a new user with email and password",
        description:
          "This endpoint allows you to create a new user account using an email address and a password. The email address must be unique and not already associated with an existing account. The password should meet the specified security requirements.",
      },
    })
    .input(createUserWithEmailAndPasswordInputModel)
    .output(createUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { fullName, email, password } = input;
      const { id, token } = await userService.createUserWithEmailAndPassword({
        fullName,
        email,
        password,
      });

      setAuthCookie(ctx, token);
      return { id };
    }),

  signInUserWithEmailAndPassword: publicProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/sign-in"),
        tags: TAGS,
        summary: "Sign in a user with email and password",
        description:
          "This endpoint allows you to sign in an existing user using their email address and password. If the provided credentials are valid, the user will be authenticated and an authentication token will be returned. This token can be used for subsequent authenticated requests to access protected resources.",
      },
    })
    .input(signInUserWithEmailAndPasswordInputModel)
    .output(signInUserWithEmailAndPasswordOutputModel)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { id, token } = await userService.signInWithEmailAndPassword({
        email,
        password,
      });

      setAuthCookie(ctx, token);
      return { id };
    }),

  getAuthenticatedUser: publicProcedure
    .meta({
      openapi: {
        method: "GET",
        path: getPath("/me"),
        tags: TAGS,
        summary: "Get the authenticated user",
        description:
          "This endpoint allows you to retrieve the details of the currently authenticated user. The request must include a valid authentication token, which will be used to identify the user. If the token is valid and corresponds to an active session, the user's information will be returned in the response.",
      },
    })
    .input(getCurrentUserInfoInput)
    .output(getCurrentUserInfoOutputModel)
    .query(async ({ ctx }) => {
      const token = getAuthCookie(ctx);
      if (!token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Authentication token is missing.",
        });
      }

      const user = await userService.verifyAndDecodeUserToken(token);
      const { id, email, fullName, profileImageUrl } = user;

      return {
        id,
        email,
        fullName,
        profileImageUrl,
      };
    }),
});
