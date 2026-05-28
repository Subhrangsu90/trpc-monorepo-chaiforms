"use client";

import {
  ArrowRight,
  Bolt,
  CheckCircle,
  ExternalLink,
  FileText,
  Mail,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  AppShell,
  type AppSection,
} from "~/components/app-shell/app-shell";
import { BrandLogo } from "~/components/brand-logo";
import { APP_ROUTE_SECTIONS } from "~/components/app-shell/types";
import { Button } from "~/components/ui/button";
import { useLogout, useMe } from "~/hooks/api/auth";

const sectionLabels: Record<AppSection, string> = {
  overview: "Overview",
  forms: "My Forms",
  templates: "Templates",
  analytics: "Analytics",
  responses: "Responses",
  themes: "Themes",
  integrations: "Integration",
};

function ChartBars() {
  const bars = [40, 65, 35, 80, 55, 90, 45, 70];

  return (
    <div className="relative mb-4 flex h-56 items-end justify-between gap-3 px-2">
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-1">
        <div className="w-full border-t border-outline-variant/10" />
        <div className="w-full border-t border-outline-variant/10" />
        <div className="w-full border-t border-outline-variant/10" />
      </div>
      {bars.map((height, index) => (
        <div
          key={`${height}-${index}`}
          className="relative flex-1 cursor-pointer rounded-t-lg bg-primary/20 transition-all hover:bg-primary"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  tone = "primary",
  value,
}: {
  icon: React.ElementType;
  label: string;
  tone?: "primary" | "tertiary" | "neutral";
  value: string;
}) {
  const tones = {
    primary: "bg-primary-container text-primary",
    tertiary: "bg-tertiary-container text-tertiary",
    neutral: "bg-secondary-container text-secondary",
  };

  return (
    <div className="group col-span-12 flex items-center justify-between rounded-[1.75rem] bg-surface-container-low p-6 shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-all hover:bg-surface-container lg:col-span-4">
      <div>
        <p className="mb-2 text-xs font-bold uppercase text-on-surface-variant/70">
          {label}
        </p>
        <h3 className="font-display text-4xl font-bold text-on-surface">{value}</h3>
      </div>
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full transition-colors ${tones[tone]}`}
      >
        <Icon className="size-7" />
      </div>
    </div>
  );
}

function OverviewDashboard({ firstName }: { firstName: string }) {
  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-10">
      <div className="mb-8 flex flex-col justify-between gap-6 rounded-[2rem] bg-surface-container-low p-6 md:flex-row md:items-center lg:p-8">
        <div>
          <BrandLogo className="mb-4" markClassName="size-9" textClassName="text-lg" />
          <h2 className="mb-2 font-display text-3xl font-bold tracking-tight text-on-surface lg:text-4xl">
            Welcome back, {firstName}
          </h2>
          <p className="font-body text-base text-on-surface-variant">
            Your workspace is performing 12% better than last month.
          </p>
        </div>
        <div className="flex w-fit rounded-full bg-surface-container-high p-1">
          <button className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-on-primary shadow-sm">
            Last 30 Days
          </button>
          <button className="rounded-full px-5 py-2 text-sm font-bold text-on-surface-variant transition-colors hover:text-on-surface">
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <section className="relative col-span-12 flex min-h-80 flex-col justify-between overflow-hidden rounded-[2rem] bg-primary-container p-7 text-on-primary-container shadow-[0_1px_3px_rgba(0,0,0,0.12)] lg:col-span-3">
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/10" />
          <div className="relative z-10">
            <div className="mb-12 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary">
                <Bolt className="size-6 text-on-primary" />
              </div>
              <span className="rounded-full bg-surface-container-lowest/70 px-3 py-1 text-xs font-bold text-primary">
                Optimal
              </span>
            </div>
            <p className="mb-2 text-xs font-bold uppercase text-on-primary-container/70">
              Conversion Rate
            </p>
            <h3 className="mb-2 font-display text-6xl font-bold text-on-primary-container">64%</h3>
            <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
              <TrendingUp className="size-4" />
              <span>+4.2% from last week</span>
            </div>
          </div>
        </section>

        <section className="col-span-12 flex flex-col rounded-[2rem] bg-surface-container-lowest p-7 shadow-[0_1px_3px_rgba(0,0,0,0.10)] lg:col-span-6">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-on-surface">Response Trends</h3>
            <a
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-bold text-primary hover:bg-primary-container"
              href="#"
            >
              Full Report <ExternalLink className="size-3" />
            </a>
          </div>
          <ChartBars />
          <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50">
            <span>Nov 01</span>
            <span>Nov 15</span>
            <span>Today</span>
          </div>
        </section>

        <section className="col-span-12 flex flex-col rounded-[2rem] bg-surface-container p-7 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-on-surface">Activity</h3>
            <button className="rounded-full px-3 py-2 text-sm font-bold text-primary hover:bg-primary-container">
              View All
            </button>
          </div>
          <div className="space-y-6">
            {[
              {
                icon: MessageSquare,
                bg: "bg-primary-fixed/30",
                text: "text-primary",
                title: "New response on",
                accent: "Movie Review",
                time: "2m ago",
              },
              {
                icon: Mail,
                bg: "bg-tertiary-fixed/30",
                text: "text-tertiary",
                title: "Feedback received:",
                accent: '"The smooth theme feels clean"',
                time: "1h ago",
              },
              {
                icon: Upload,
                bg: "bg-surface-variant",
                text: "text-on-surface-variant",
                title: "Published",
                accent: "Q4 Survey",
                time: "4h ago",
              },
            ].map(({ accent, bg, icon: Icon, text, time, title }) => (
              <div key={`${title}-${time}`} className="flex items-start gap-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg}`}>
                  <Icon className={`size-4 ${text}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-snug">
                    {title} <span className="cursor-pointer text-primary hover:underline">{accent}</span>
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase text-on-surface-variant/60">
                    {time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <MetricCard icon={FileText} label="Total Forms" value="12" />
        <MetricCard icon={MessageSquare} label="Total Responses" tone="tertiary" value="1.2k" />
        <MetricCard icon={CheckCircle} label="Active Forms" tone="neutral" value="8" />

        <section className="relative col-span-12 mt-4 flex min-h-[320px] items-center overflow-hidden rounded-[2.25rem] bg-secondary-container p-8 text-on-secondary-container lg:p-12">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-surface-container-lowest/60 px-4 py-2 text-primary">
              <Sparkles className="size-4" />
              <span className="text-sm font-bold">Material refresh</span>
            </div>
            <h2 className="mb-5 font-display text-3xl font-bold leading-tight text-on-secondary-container lg:text-4xl">
              Build calm, rounded forms with Material-style themes
            </h2>
            <p className="mb-8 font-body text-lg leading-relaxed text-on-secondary-container/80">
              Smooth tonal surfaces, pill controls, soft elevation, and adaptable violet-blue
              accents make the workspace feel modern and easy to scan.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-bold text-on-primary shadow-[0_2px_6px_rgba(0,0,0,0.16)] transition-all hover:brightness-105">
                <span>Explore Themes</span>
                <ArrowRight className="size-5" />
              </button>
              <button className="rounded-full bg-surface-container-lowest/70 px-8 py-4 font-bold text-on-secondary-container transition-all hover:bg-surface-container-lowest">
                Learn more
              </button>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 overflow-hidden lg:block">
            <div
              className="h-full w-full bg-cover bg-center opacity-80"
              style={{
                backgroundImage:
                  "url(https://lh3.googleusercontent.com/aida-public/AB6AXuBoPLvDp7_YJCHV0zEqKTrNWDz7J14jRa9eqac6rpeXr0VpCaSkhKHumi7RCuH8Iw8DS9vxavTiWiY2hvzFwTXjTGpo7HgIjFBKQxG5qPGGgBr79jph02JFd9eQQId9j6JqxVLb0XjwL85bVWfcYqSDb4YZ3UceX9HB8DWpQD_-5uslLRn968Qya4BUgGD6uVq69n7jmUUIm7jQ2LQUqz5M6YR0KEdL60Lz473qbLhWThqrs3eMvpFrI1XjJN-1TMUNd9enT-vDGaL3)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-secondary-container" />
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionPlaceholder({ section }: { section: AppSection }) {
  return (
    <div className="mx-auto max-w-[1600px] p-6 lg:p-10">
      <section className="flex min-h-[70vh] flex-col justify-center rounded-[2rem] bg-surface-container-low p-10">
        <p className="mb-3 text-sm font-bold text-primary">
          Formora
        </p>
        <h2 className="mb-4 font-display text-4xl font-bold text-on-surface">
          {sectionLabels[section]}
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant">
          This dashboard section is wired into the shared navigation shell. The Overview page is
          implemented now; this area is ready for the next workflow.
        </p>
      </section>
    </div>
  );
}

export default function Dashboard() {
  const { me, isLoading, isError } = useMe();
  const { signOutAsync } = useLogout();
  const pathname = usePathname();
  const router = useRouter();
  const activeSection: AppSection = APP_ROUTE_SECTIONS[pathname] ?? "overview";

  useEffect(() => {
    if (!isLoading && !me) {
      router.replace("/sign-in");
    }
  }, [me, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <BrandLogo markClassName="size-10" textClassName="text-3xl" />
      </div>
    );
  }

  if (isError || !me) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="space-y-4 text-center">
          <h1 className="font-display text-3xl text-on-surface">Access Denied</h1>
          <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
        </div>
      </div>
    );
  }

  const firstName = me.fullName.split(" ")[0] || me.fullName;

  const handleLogout = async () => {
    await signOutAsync();
    router.replace("/sign-in");
  };

  return (
    <AppShell
      activeSection={activeSection}
      onLogout={handleLogout}
      user={me}
    >
      {activeSection === "overview" ? (
        <OverviewDashboard firstName={firstName} />
      ) : (
        <SectionPlaceholder section={activeSection} />
      )}
    </AppShell>
  );
}
