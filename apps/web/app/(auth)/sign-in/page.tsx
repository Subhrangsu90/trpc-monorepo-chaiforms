"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

import { BrandLogo } from "~/components/brand-logo";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { useLogin } from "~/hooks/api/auth";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInForm = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signInWithEmailAndPasswordAsync } = useLogin();

  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPasswordAsync(data);
      form.reset();
      router.replace("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to sign in";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid h-dvh overflow-hidden bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(32rem,0.82fr)]">
      <section className="relative hidden min-h-0 items-end overflow-hidden bg-primary-container p-12 text-on-primary-container xl:p-16 2xl:p-20 lg:flex">
        <div className="absolute left-16 top-16 h-48 w-48 rounded-[3rem] bg-primary/15" />
        <div className="absolute right-12 top-28 h-64 w-64 rounded-full bg-tertiary-container/70" />
        <div className="absolute bottom-20 right-24 h-36 w-72 rounded-full bg-surface-container-lowest/60" />

        <div className="relative z-10 space-y-5 2xl:space-y-6">
          <Link href="/" className="mb-5 inline-flex items-center gap-2 2xl:mb-8">
            <BrandLogo markClassName="size-12" textClassName="text-2xl text-on-primary-container" />
          </Link>

          <h1 className="max-w-xl font-display text-5xl font-bold leading-tight tracking-tight xl:text-7xl">
            Smooth forms, clear workspace
          </h1>
          <p className="max-w-md text-lg leading-relaxed text-on-primary-container/75 xl:text-xl">
            Material-style surfaces, rounded controls, and soft violet-blue accents keep every form
            workflow calm and readable.
          </p>
        </div>
      </section>

      <section className="flex min-h-0 flex-col items-center justify-center overflow-y-auto bg-surface p-6 md:p-8 lg:overflow-hidden lg:p-10 xl:p-14 2xl:p-20">
        <Link href="/" className="mb-6 flex w-full max-w-sm items-center gap-3 sm:max-w-md lg:hidden">
          <BrandLogo markClassName="size-10" textClassName="text-2xl" />
        </Link>

        <div className="w-full max-w-sm space-y-5 sm:max-w-md xl:space-y-6 2xl:space-y-8">
          <div className="space-y-2">
            <h2 className="font-display text-3xl tracking-tight text-on-surface xl:text-4xl">
              Welcome back
            </h2>
            <p className="font-body text-on-surface-variant">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-3 rounded-full bg-surface-container-low px-4 font-label text-sm text-on-surface transition-all duration-300 hover:bg-surface-container"
            >
              <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-3 rounded-full bg-surface-container-low px-4 font-label text-sm text-on-surface transition-all duration-300 hover:bg-surface-container"
            >
              <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              GitHub
            </button>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/40" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-surface px-4 text-on-surface-variant">
                Or continue with email
              </span>
            </div>
          </div>

          {error && (
            <div className="rounded-3xl bg-error-container p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-label text-sm font-semibold text-on-surface-variant">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        disabled={isLoading}
                        className="h-12 rounded-full border-0 bg-surface-container-low px-5 text-on-surface placeholder:text-outline focus-visible:ring-2 focus-visible:ring-primary/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FormLabel className="font-label text-sm font-semibold text-on-surface-variant">
                        Password
                      </FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary transition-all hover:underline"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="........"
                          disabled={isLoading}
                          className="h-12 rounded-full border-0 bg-surface-container-low px-5 pr-11 text-on-surface placeholder:text-outline focus-visible:ring-2 focus-visible:ring-primary/30"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant transition-colors hover:text-primary"
                          onClick={() => setShowPassword((value) => !value)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2 py-1">
                <input
                  id="remember"
                  type="checkbox"
                  className="size-4 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="text-sm text-on-surface-variant">
                  Keep me signed in for 30 days
                </label>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-full bg-primary font-label font-bold text-on-primary shadow-[0_2px_6px_rgba(0,0,0,0.16)] transition-all duration-300 hover:brightness-105 active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In to Workspace"}
              </Button>
            </form>
          </Form>

          <p className="text-center text-on-surface-variant">
            New to Formora?{" "}
            <Link href="/sign-up" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </p>

          <div className="flex justify-center gap-6 pt-2 font-label text-xs uppercase tracking-widest text-outline">
            <Link href="#" className="transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="transition-colors hover:text-primary">
              Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
