"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "~/components/ui/button";
import { useMe } from "~/hooks/api/auth";

export default function Home() {
  const { me, isLoading, isError } = useMe();
  const router = useRouter();
  useEffect(() => {
    if (me && me.id) {
      // User is authenticated, redirect to dashboard
      router.replace("/dashboard");
    } else {
      router.replace("/sign-in");
    }
  }, [me, isLoading, isError]);

  if (isLoading) {
    return (
      <main className="min-h-screen min-w-screen flex justify-center items-center">
        <h1 className="text-3xl">ChaiForms</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl">ChaiForms</h1>
        {me && !isError ? (
          <h2>Welcome, {me.fullName}!</h2>
        ) : (
          <div className="space-y-3">
            <h2>Sign in to continue.</h2>
            <div className="flex items-center justify-center gap-2">
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/sign-up">Create Account</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
