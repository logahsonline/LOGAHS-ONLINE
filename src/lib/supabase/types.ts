export type SiteRole = "site_admin" | "club_admin" | "visitor";

export type AppProfile = {
  id: string;
  display_name: string | null;
  role: SiteRole;
  club_id: string | null;
};

