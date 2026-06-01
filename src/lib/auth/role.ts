import { redirect } from "next/navigation";
import { getServerSupabaseClient } from "../supabase/server";
import type { AppProfile } from "../supabase/types";






async function requireProfile() {
  const supabase = getServerSupabaseClient();

  const { data: authUser, error: authErr } = await supabase.auth.getUser();
  if (authErr || !authUser?.user) {
    redirect("/admin");
  }

  const { data: profile, error: profileErr } = await supabase
    .from("app_profiles")
    .select("id, display_name, role, club_id")
    .eq("id", authUser.user.id)
    .single();

  if (profileErr || !profile) {
    redirect("/admin");
  }

  return profile as AppProfile;
}

export async function requireSiteAdmin() {
  const profile = await requireProfile();
  if (profile.role !== "site_admin") redirect("/");
  return profile;
}

export async function requireClubAdmin(clubSlug: string) {
  const profile = await requireProfile();
  if (profile.role !== "club_admin") redirect("/");

  const supabase = getServerSupabaseClient();
  const { data: club, error: clubErr } = await supabase
    .from("clubs")
    .select("id")
    .eq("slug", clubSlug)
    .single();

  if (clubErr || !club) redirect("/");

  if (profile.club_id !== club.id) redirect("/");
  return profile;
}

