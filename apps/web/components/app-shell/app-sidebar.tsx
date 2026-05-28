"use client";

import type { ElementType } from "react";
import Link from "next/link";
import {
  BarChart3,
  Cable,
  FileText,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Palette,
  PlusCircle,
  Settings,
  Sparkles,
} from "lucide-react";

import { BrandLogo } from "~/components/brand-logo";
import type { AppSection, AppUser } from "~/components/app-shell/types";
import { APP_SECTION_ROUTES } from "~/components/app-shell/types";
import { cn } from "~/lib/utils";

type AppSidebarProps = {
  activeSection: AppSection;
  user: AppUser;
};

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, href: APP_SECTION_ROUTES.overview },
  { id: "forms", label: "My Forms", icon: FileText, href: APP_SECTION_ROUTES.forms },
  { id: "templates", label: "Templates", icon: Sparkles, href: APP_SECTION_ROUTES.templates },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: APP_SECTION_ROUTES.analytics },
  { id: "responses", label: "Responses", icon: MessageSquare, href: APP_SECTION_ROUTES.responses },
  { id: "themes", label: "Themes", icon: Palette, href: APP_SECTION_ROUTES.themes },
  { id: "integrations", label: "Integration", icon: Cable, href: APP_SECTION_ROUTES.integrations },
] satisfies Array<{ id: AppSection; label: string; icon: ElementType; href: string }>;

function UserAvatar({ user }: { user: AppUser }) {
  if (user.profileImageUrl) {
    return (
      <div
        aria-label={user.fullName}
        className="h-9 w-9 rounded-full border border-outline-variant/30 bg-primary-fixed-dim bg-cover bg-center"
        style={{ backgroundImage: `url(${user.profileImageUrl})` }}
      />
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-outline-variant/30 bg-primary-fixed-dim text-xs font-bold text-on-primary-fixed">
      {user.fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()}
    </div>
  );
}

export function AppSidebar({ activeSection, user }: AppSidebarProps) {
  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col bg-surface-container-low py-5 lg:flex">
        <div className="mb-10 px-6">
          <Link href="/dashboard">
            <BrandLogo markClassName="size-10" />
          </Link>
          <p className="mt-1 text-xs font-semibold text-on-surface-variant">
            Material Workspace
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3">
          {navItems.map(({ id, label, icon: Icon, href }) => {
            const isActive = activeSection === id;

            return (
              <Link
                key={id}
                href={href}
                className={cn(
                  "flex w-full items-center rounded-full px-4 py-3 text-left transition-all duration-200 active:scale-95",
                  isActive
                    ? "bg-secondary-container font-semibold text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                )}
              >
                <Icon className="mr-3 size-5" />
                <span className="font-body text-sm">{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1 px-4 pt-6">
          <button className="mb-6 flex w-full items-center justify-center rounded-full bg-primary px-4 py-3 font-bold text-on-primary shadow-[0_2px_6px_rgba(0,0,0,0.16)] transition-all hover:brightness-105 active:scale-95">
            <PlusCircle className="mr-2 size-5" />
            <span className="text-sm">New Form</span>
          </button>

          <button className="mb-1 flex items-center rounded-full px-3 py-2 text-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface">
            <HelpCircle className="mr-3 size-5" />
            <span>Help Support</span>
          </button>

          <div className="flex items-center rounded-[1.5rem] bg-surface-container px-3 py-3">
            <UserAvatar user={user} />
            <div className="ml-3 min-w-0 flex-1">
              <p className="truncate text-xs font-bold">{user.fullName}</p>
              <p className="truncate text-[10px] text-on-surface-variant">Pro Plan</p>
            </div>
            <Settings className="size-5 cursor-pointer text-on-surface-variant transition-colors hover:text-primary" />
          </div>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface-container-low/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-7 gap-1">
          {navItems.map(({ id, label, icon: Icon, href }) => {
            const isActive = activeSection === id;

            return (
              <Link
                key={id}
                href={href}
                aria-label={label}
                title={label}
                className={cn(
                  "flex h-12 items-center justify-center rounded-full transition-all active:scale-95",
                  isActive
                    ? "bg-secondary-container text-on-secondary-container"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                )}
              >
                <Icon className="size-5" />
              </Link>
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] right-4 z-50 flex size-14 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-[0_3px_8px_rgba(0,0,0,0.22)] transition-all hover:brightness-105 active:scale-95 lg:hidden"
        aria-label="Create new form"
        title="New Form"
      >
        <PlusCircle className="size-7" />
      </button>
    </>
  );
}
