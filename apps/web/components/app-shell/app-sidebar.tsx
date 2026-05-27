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

import type { AppSection, AppUser } from "~/components/app-shell/types";
import { cn } from "~/lib/utils";

type AppSidebarProps = {
  activeSection: AppSection;
  onSectionChange: (section: AppSection) => void;
  user: AppUser;
};

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "forms", label: "My Forms", icon: FileText },
  { id: "templates", label: "Templates", icon: Sparkles },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "responses", label: "Responses", icon: MessageSquare },
  { id: "themes", label: "Themes", icon: Palette },
  { id: "integrations", label: "Integration", icon: Cable },
] satisfies Array<{ id: AppSection; label: string; icon: ElementType }>;

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

export function AppSidebar({ activeSection, onSectionChange, user }: AppSidebarProps) {
  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-outline-variant/60 bg-surface-container-low py-4 lg:flex">
        <div className="mb-10 px-6">
          <Link href="/dashboard" className="font-display text-xl font-bold text-primary">
            Sahara FormForge
          </Link>
          <p className="font-bold uppercase tracking-[0.2em] text-[10px] text-on-surface-variant">
            Creator Workspace
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSectionChange(id)}
                className={cn(
                  "flex w-full items-center rounded-xl px-4 py-3 text-left transition-all duration-200 active:scale-95",
                  isActive
                    ? "bg-primary font-semibold text-on-primary shadow-md shadow-primary/20"
                    : "text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface",
                )}
              >
                <Icon className="mr-3 size-5" />
                <span className="font-body text-sm">{label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1 border-t border-outline-variant/30 px-4 pt-6">
          <button className="mb-6 flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 font-bold text-on-primary shadow-lg shadow-primary/10 transition-all hover:brightness-110 active:scale-95">
            <PlusCircle className="mr-2 size-5" />
            <span className="text-sm">New Form</span>
          </button>

          <button className="mb-1 flex items-center px-2 py-2 text-sm text-on-surface-variant hover:text-on-surface">
            <HelpCircle className="mr-3 size-5" />
            <span>Help Support</span>
          </button>

          <div className="flex items-center border-t border-outline-variant/30 py-4">
            <UserAvatar user={user} />
            <div className="ml-3 min-w-0 flex-1">
              <p className="truncate text-xs font-bold">{user.fullName}</p>
              <p className="truncate text-[10px] text-on-surface-variant">Pro Plan</p>
            </div>
            <Settings className="size-5 cursor-pointer text-on-surface-variant transition-colors hover:text-primary" />
          </div>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant/40 bg-surface/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-7 gap-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSectionChange(id)}
                aria-label={label}
                title={label}
                className={cn(
                  "flex h-12 items-center justify-center rounded-xl transition-all active:scale-95",
                  isActive
                    ? "bg-primary text-on-primary shadow-md shadow-primary/15"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
                )}
              >
                <Icon className="size-5" />
              </button>
            );
          })}
        </div>
      </nav>

      <button
        type="button"
        className="fixed bottom-[calc(env(safe-area-inset-bottom)+4.75rem)] right-4 z-50 flex size-14 items-center justify-center rounded-2xl bg-primary text-on-primary shadow-xl shadow-primary/25 transition-all hover:brightness-110 active:scale-95 lg:hidden"
        aria-label="Create new form"
        title="New Form"
      >
        <PlusCircle className="size-7" />
      </button>
    </>
  );
}
