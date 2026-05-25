import { trpc } from "~/trpc/client";

export const useSignUp = () => {
  const utils = trpc.useUtils();
  const {
    mutateAsync: createUserWithEmailAndPasswordAsync,
    mutate: createUserWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isSuccess,
    isIdle,
    status,
  } = trpc.auth.createUserWithEmailAndPassword.useMutation({
    onSuccess: () => {
      utils.auth.getAuthenticatedUser.invalidate();
    },
  });

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
  const utils = trpc.useUtils();
  const {
    mutateAsync: signInWithEmailAndPasswordAsync,
    mutate: signInWithEmailAndPassword,
    error,
    failureCount,
    isError,
    isSuccess,
    isIdle,
    status,
  } = trpc.auth.signInUserWithEmailAndPassword.useMutation({
    onSuccess: () => {
      utils.auth.getAuthenticatedUser.invalidate();
    },
  });

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

export const useMe = () => {
  const {
    data: me,
    error,
    isFetching,
    isLoading,
    isError,
  } = trpc.auth.getAuthenticatedUser.useQuery();

  return {
    me,
    error,
    isFetching,
    isLoading,
    isError,
  };
};
