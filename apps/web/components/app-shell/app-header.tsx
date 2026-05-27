"use client";

import Link from "next/link";
import { Bell, Eye, LogOut, Search, Settings, UserCircle } from "lucide-react";
import * as React from "react";

import { ThemeToggle } from "~/components/theme-toggle";
import type { AppUser } from "~/components/app-shell/types";

type AppHeaderProps = {
  onLogout: () => void;
  user: AppUser;
};

function UserAvatar({ user }: { user: AppUser }) {
  if (user.profileImageUrl) {
    return (
      <span
        className="block size-9 rounded-full border border-outline-variant/40 bg-primary-fixed-dim bg-cover bg-center"
        style={{ backgroundImage: `url(${user.profileImageUrl})` }}
      />
    );
  }

  return (
    <span className="flex size-9 items-center justify-center rounded-full border border-outline-variant/40 bg-primary-fixed-dim text-xs font-bold text-on-primary-fixed">
      {user.fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()}
    </span>
  );
}

export function AppHeader({ onLogout, user }: AppHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant/30 bg-surface/90 px-4 backdrop-blur-md lg:left-64 lg:px-8">
      <Link href="/dashboard" className="mr-4 min-w-0 lg:hidden">
        <span className="block truncate font-display text-lg font-bold text-primary">Sahara</span>
      </Link>

      <div className="hidden flex-1 items-center md:flex lg:max-w-2xl">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-on-surface-variant" />
          <input
            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-low py-2 pl-12 pr-4 text-sm transition-all placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
            placeholder="Search workspace..."
            type="text"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3 text-on-surface-variant sm:gap-4 lg:gap-6">
        <ThemeToggle />
        <Eye className="hidden size-5 cursor-pointer transition-all hover:text-primary sm:block" />
        <div className="relative hidden sm:block">
          <Bell className="size-5 cursor-pointer transition-all hover:text-primary" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-surface bg-primary" />
        </div>

        <div className="relative">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full outline-none transition-all hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40"
            onClick={() => setIsProfileOpen((value) => !value)}
            aria-label="Open profile menu"
            aria-expanded={isProfileOpen}
          >
            <UserAvatar user={user} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 top-12 w-64 overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-2 text-on-surface shadow-xl">
              <div className="border-b border-outline-variant/30 px-3 py-3">
                <p className="truncate text-sm font-bold">{user.fullName}</p>
                <p className="truncate text-xs text-on-surface-variant">{user.email}</p>
              </div>
              <button className="mt-2 flex w-full items-center rounded-xl px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">
                <Settings className="mr-3 size-4" />
                Settings
              </button>
              <button className="flex w-full items-center rounded-xl px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-error">
                <UserCircle className="mr-3 size-4" />
                Profile
              </button>
              <button
                type="button"
                className="mt-2 flex w-full items-center rounded-xl border-t border-outline-variant/20 px-3 py-2 text-sm font-semibold text-error transition-colors hover:bg-error-container"
                onClick={onLogout}
              >
                <LogOut className="mr-3 size-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
