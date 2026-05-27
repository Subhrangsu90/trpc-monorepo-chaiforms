"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

const themes = [
  { value: "system", label: "System theme", icon: Laptop },
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
] as const;

type ThemeValue = (typeof themes)[number]["value"];

function getNextTheme(theme: ThemeValue) {
  const currentIndex = themes.findIndex((item) => item.value === theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length] ?? themes[0];
  return nextTheme.value;
}

export function ThemeToggle() {
  const mounted = React.useSyncExternalStore(
    React.useCallback(() => () => undefined, []),
    () => true,
    () => false,
  );
  const { setTheme, theme = "system" } = useTheme();
  const activeTheme = themes.some((item) => item.value === theme)
    ? (theme as ThemeValue)
    : "system";
  const { icon: Icon, label } = themes.find((item) => item.value === activeTheme) ?? themes[0];

  return (
    <button
      type="button"
      className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface-variant transition-all hover:bg-surface-container hover:text-primary active:scale-95"
      onClick={() => setTheme(getNextTheme(activeTheme))}
      aria-label={mounted ? `${label}. Toggle theme` : "Toggle theme"}
      title={mounted ? label : "Theme"}
    >
      <Icon className="size-4" />
    </button>
  );
}
