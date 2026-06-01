-- LOGAHS ONLINE — seed.sql
-- Seed initial site settings, default clubs, and role assignments.
--
-- IMPORTANT:
-- User lookup is done by username stored in auth.users.raw_user_meta_data->>'username'.
-- This matches your system where people sign in using username.

begin;

-- Create/Upsert single site settings row
insert into public.site_settings (site_name, top_logo_1_path, top_logo_2_path, active_theme)
values ('LOGAHS ONLINE', 'site-logos/top1.png', 'site-logos/top2.png', 'sky')
on conflict do nothing;

-- Ensure there are 5 theme catalog entries (safe if schema already seeded)
insert into public.theme_catalog (slug, name)
values
  ('sky','Skyline'),
  ('emerald','Emerald'),
  ('violet','Violet'),
  ('amber','Amber'),
  ('rose','Rose')
on conflict (slug) do nothing;

-- Default clubs
with clubs as (
  select 'paramount-club'::text as slug, 'Paramount Club'::text as name union all
  select 'interact-club', 'Interact Club' union all
  select 'peer-educators-network', 'Peer Educators Network' union all
  select 'computer-club', 'Computer Club'
)
insert into public.clubs (slug, name, logo_path)
select c.slug, c.name,
  case c.slug
    when 'paramount-club' then 'club-logos/paramount.png'
    when 'interact-club' then 'club-logos/interact.png'
    when 'peer-educators-network' then 'club-logos/peer-educators.png'
    when 'computer-club' then 'club-logos/computer.png'
    else null
  end as logo_path
from clubs c
on conflict (slug) do nothing;

-- Helper: insert/update app_profiles by auth username
create or replace function public.upsert_profile_by_username(
  _username text,
  _display_name text,
  _role text,
  _club_slug text
)
returns void
language plpgsql
as $$
declare
  _uid uuid;
  _club_id uuid;
begin
  select id into _uid
  from auth.users
  where raw_user_meta_data->>'username' = _username
  limit 1;

  if _uid is null then
    raise notice 'No auth user found for username %', _username;
    return;
  end if;

  if _club_slug is not null then
    select id into _club_id from public.clubs where slug = _club_slug limit 1;
  else
    _club_id := null;
  end if;

  insert into public.app_profiles (id, display_name, role, club_id)
  values (_uid, _display_name, _role, _club_id)
  on conflict (id) do update
    set display_name = excluded.display_name,
        role = excluded.role,
        club_id = excluded.club_id;
end;
$$;

-- =============================
-- Seed admin accounts by username
-- =============================

-- Site admins
select public.upsert_profile_by_username('vincent1','Super Admin #1','site_admin', null);
select public.upsert_profile_by_username('mada123','Super Admin #2','site_admin', null);

-- Club admins
select public.upsert_profile_by_username('Interact01','Interact Club Admin','club_admin','interact-club');
select public.upsert_profile_by_username('Paramount02','Paramount Club Admin','club_admin','paramount-club');
select public.upsert_profile_by_username('Peer03','Peer Educators Network Admin','club_admin','peer-educators-network');
select public.upsert_profile_by_username('Computer04','Computer Club Admin','club_admin','computer-club');

commit;

