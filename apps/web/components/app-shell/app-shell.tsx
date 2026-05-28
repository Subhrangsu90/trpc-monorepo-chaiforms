"use client";

import type { ReactNode } from "react";

import { AppFooter } from "~/components/app-shell/app-footer";
import { AppHeader } from "~/components/app-shell/app-header";
import { AppSidebar } from "~/components/app-shell/app-sidebar";
import type { AppSection, AppUser } from "~/components/app-shell/types";

type AppShellProps = {
  activeSection: AppSection;
  children: ReactNode;
  onLogout: () => void;
  user: AppUser;
};

export function AppShell({
  activeSection,
  children,
  onLogout,
  user,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface">
      <AppSidebar activeSection={activeSection} user={user} />
      <AppHeader onLogout={onLogout} user={user} />
      <main className="min-h-screen pb-20 pt-16 lg:pb-0 lg:pl-64">{children}</main>
      <AppFooter />
    </div>
  );
}

export type { AppSection, AppUser };
