import { trpc } from "~/trpc/client";

export const useSignUp = () => {
  const {
    mutateAsync: createUserWithEmailAndPasswordAsync,
    mutate: createUserWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isSuccess,
    isIdle,
    status,
  } = trpc.auth.createUserWithEmailAndPassword.useMutation();

  return {
    createUserWithEmailAndPasswordAsync,
    createUserWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isSuccess,
    isIdle,
    status,
  };
};

export const useLogin = () => {
  const {
    mutateAsync: signInWithEmailAndPasswordAsync,
    mutate: signInWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isSuccess,
    isIdle,
    status,
  } = trpc.auth.signInUserWithEmailAndPassword.useMutation();

  return {
    signInWithEmailAndPasswordAsync,
    signInWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isSuccess,
    isIdle,
    status,
  };
};
