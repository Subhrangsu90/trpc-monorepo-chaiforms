"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";

import { BrandLogo, BrandMark } from "~/components/brand-logo";
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

import { useSignUp } from "~/hooks/api/auth";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const { createUserWithEmailAndPasswordAsync } = useSignUp();

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true);
    setError(null);

    try {
      await createUserWithEmailAndPasswordAsync(data);
      form.reset();
      router.replace("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create account";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid h-dvh overflow-hidden bg-surface lg:grid-cols-[minmax(0,1fr)_minmax(32rem,0.82fr)]">
      <section className="relative hidden min-h-0 flex-col justify-between overflow-hidden bg-secondary-container p-12 text-on-secondary-container lg:flex">
        <div className="absolute left-10 top-20 h-56 w-56 rounded-[3rem] bg-primary-container" />
        <div className="absolute right-12 top-16 h-40 w-72 rounded-full bg-tertiary-container/60" />
        <div className="absolute bottom-24 right-20 h-52 w-52 rounded-full bg-surface-container-lowest/60" />
        <Link href="/" className="z-10 flex items-center gap-2">
          <BrandLogo markClassName="size-12" textClassName="text-2xl text-on-secondary-container" />
        </Link>

        <div className="relative z-10">
          <h1 className="mb-8 max-w-lg font-headline text-6xl font-bold leading-tight xl:text-7xl">
            Create a softer workspace
          </h1>
          <p className="max-w-sm font-body text-lg leading-relaxed text-on-secondary-container/75">
            Start with smooth Material containers, pill controls, and calm accent colors that scale
            across templates.
          </p>
        </div>

        <div className="relative z-10 max-w-xs rounded-[2rem] bg-surface-container-lowest/60 p-6">
          <span className="font-label text-sm font-bold text-primary">
            Selected Templates
          </span>
          <div className="mt-4 flex gap-4 opacity-60">
            <div className="h-1 w-12 bg-primary" />
            <div className="h-1 w-12 bg-outline-variant" />
            <div className="h-1 w-12 bg-outline-variant" />
          </div>
        </div>

      </section>

      <section className="relative flex min-h-0 flex-col items-center justify-center overflow-y-auto bg-surface px-6 md:px-16 lg:overflow-hidden xl:px-24">
        <Link href="/" className="absolute left-8 top-8 lg:hidden">
          <BrandLogo markClassName="size-9" textClassName="text-xl" />
        </Link>

        <div className="w-full max-w-md py-10">
          <header className="mb-8 text-center lg:text-left">
            <h2 className="mb-2 font-headline text-4xl text-on-surface">Create Account</h2>
            <p className="font-body text-on-surface-variant">
              Start your smooth Material workspace.
            </p>
          </header>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-3 rounded-full bg-surface-container-low px-4 transition-colors duration-200 hover:bg-surface-container"
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
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-semibold text-on-surface-variant">Google</span>
            </button>
            <button
              type="button"
              className="flex h-11 items-center justify-center gap-3 rounded-full bg-surface-container-low px-4 transition-colors duration-200 hover:bg-surface-container"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="font-semibold text-on-surface-variant">GitHub</span>
            </button>
          </div>

          <div className="relative mb-6 flex items-center">
            <div className="grow border-t border-outline-variant/40" />
            <span className="mx-4 shrink-0 font-label text-xs uppercase tracking-widest text-outline">
              or email
            </span>
            <div className="grow border-t border-outline-variant/40" />
          </div>

          {error && (
            <div className="mb-5 rounded-3xl bg-error-container p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1 block font-semibold text-on-surface-variant">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Evelyn Thorne"
                        disabled={isLoading}
                        className="h-12 rounded-full border-0 bg-surface-container-low px-5 placeholder:text-outline/60 focus-visible:ring-2 focus-visible:ring-primary/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="ml-1 block font-semibold text-on-surface-variant">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="evelyn@formora.app"
                        disabled={isLoading}
                        className="h-12 rounded-full border-0 bg-surface-container-low px-5 placeholder:text-outline/60 focus-visible:ring-2 focus-visible:ring-primary/30"
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
                  <FormItem>
                    <FormLabel className="ml-1 block font-semibold text-on-surface-variant">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="........"
                          disabled={isLoading}
                          className="h-12 rounded-full border-0 bg-surface-container-low px-5 pr-11 placeholder:text-outline/60 focus-visible:ring-2 focus-visible:ring-primary/30"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 transition-colors hover:text-primary"
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

              <div className="flex items-start gap-3 pt-1">
                <input
                  className="mt-1 rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary"
                  id="tos"
                  type="checkbox"
                />
                <label className="text-sm leading-relaxed text-on-surface-variant" htmlFor="tos">
                  I agree to the{" "}
                  <Link className="text-primary underline-offset-4 hover:underline" href="#">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link className="text-primary underline-offset-4 hover:underline" href="#">
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <Button
                type="submit"
                className="mt-4 h-12 w-full rounded-full bg-primary px-6 font-bold text-on-primary shadow-[0_2px_6px_rgba(0,0,0,0.16)] transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </Form>

          <footer className="mt-8 text-center">
            <p className="text-on-surface-variant">
              Already have an account?{" "}
              <Link
                className="ml-1 font-bold text-primary underline-offset-4 hover:underline"
                href="/sign-in"
              >
                Sign in instead
              </Link>
            </p>
          </footer>
        </div>
        <BrandMark className="pointer-events-none absolute bottom-12 right-12 hidden size-32 opacity-10 lg:block" />
      </section>
    </div>
  );
}
