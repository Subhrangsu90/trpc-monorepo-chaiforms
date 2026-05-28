export const APP_SECTIONS = [
  "overview",
  "forms",
  "templates",
  "analytics",
  "responses",
  "themes",
  "integrations",
] as const;

export type AppSection = (typeof APP_SECTIONS)[number];

export const APP_SECTION_ROUTES = {
  overview: "/dashboard",
  forms: "/form",
  templates: "/templates",
  analytics: "/analytics",
  responses: "/responses",
  themes: "/themes",
  integrations: "/integrations",
} satisfies Record<AppSection, string>;

export const APP_ROUTE_SECTIONS = Object.fromEntries(
  Object.entries(APP_SECTION_ROUTES).map(([section, route]) => [route, section]),
) as Record<string, AppSection>;

export function isAppSection(value: string): value is AppSection {
  return APP_SECTIONS.includes(value as AppSection);
}

export type AppUser = {
  fullName: string;
  email: string;
  profileImageUrl?: string | null;
};
