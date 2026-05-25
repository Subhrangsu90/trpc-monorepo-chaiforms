"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useMe } from "~/hooks/api/auth";

export default function Dashboard() {
  const { me, isLoading, isError } = useMe();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !me) {
      router.replace("/sign-in");
    }
  }, [me, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center space-y-2">
          <h1 className="text-3xl">Loading...</h1>
        </div>
      </div>
    );
  }

  if (isError || !me) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl">Access Denied</h1>
          <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {me.fullName}!</p>
          </div>

          <div className="rounded-lg border bg-card p-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {me.profileImageUrl && (
                  <img
                    src={me.profileImageUrl}
                    alt={me.fullName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold">{me.fullName}</h2>
                  <p className="text-sm text-muted-foreground">{me.email}</p>
                </div>
              </div>

              <div className="grid gap-4 pt-4">
                <div className="rounded bg-muted p-3">
                  <p className="text-xs font-medium text-muted-foreground">USER ID</p>
                  <p className="font-mono text-sm mt-1">{me.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
