export type AppSection =
  | "overview"
  | "forms"
  | "templates"
  | "analytics"
  | "responses"
  | "themes"
  | "integrations";

export type AppUser = {
  fullName: string;
  email: string;
  profileImageUrl?: string | null;
};
