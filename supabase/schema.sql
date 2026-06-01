-- LOGAHS ONLINE — Supabase schema (public schema)
-- Creates tables + RLS policies for:
-- site_admin, club_admin, visitor
-- plus CRUD domain objects: clubs, posts/media, comments, likes/dislikes, follows, polls, sports, rankings, athletes, events, themes, site settings.
--
-- Apply this SQL in Supabase SQL Editor.

-- Extensions
create extension if not exists pgcrypto;

-- =============================
-- Roles
-- =============================
-- We map app users to roles via profile table.

create table if not exists public.app_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null check (role in ('site_admin','club_admin','visitor')) default 'visitor',
  club_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists app_profiles_club_id_idx on public.app_profiles (club_id);

-- =============================
-- Clubs
-- =============================
create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  logo_path text, -- storage path (e.g. club-logos/clubSlug.png)
  created_at timestamptz not null default now()
);

-- If role=club_admin then club_id must be present.
alter table public.app_profiles
  add constraint app_profiles_club_admin_requires_club
  check (role <> 'club_admin' or club_id is not null);

-- =============================
-- Site settings + themes
-- =============================
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'LOGAHS ONLINE',
  top_logo_1_path text,
  top_logo_2_path text,
  active_theme text not null default 'sky',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists site_settings_active_theme_idx on public.site_settings (active_theme);

-- Keep 1 row semantics for site_settings.
-- You can enforce singleton with trigger later if desired.

-- Visitor theme preference (optional but useful)
create table if not exists public.user_theme_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  theme_mode text not null check (theme_mode in ('light','dark')) default 'light',
  created_at timestamptz not null default now(),
  unique (user_id)
);

-- =============================
-- Posts (written updates + media posts)
-- =============================
-- A post can optionally be scoped to a club.
-- For non-club posts (general news), club_id is null.

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  club_id uuid references public.clubs (id) on delete cascade,

  post_type text not null check (post_type in ('news','update','picture','video','announcement')) default 'news',
  title text,
  body text,

  -- Media attachments are stored in separate tables.

  published boolean not null default true,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_club_id_idx on public.posts (club_id);
create index if not exists posts_published_idx on public.posts (published, created_at desc);

-- Dedicated video updates (multiple per post)
create table if not exists public.post_videos (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  title text,
  video_url text not null, -- or storage path
  video_path text, -- if stored
  created_at timestamptz not null default now(),
  uploaded_by uuid not null references auth.users (id) on delete cascade
);

-- Dedicated pictures (multiple per post)
create table if not exists public.post_pictures (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  caption text,
  image_url text, -- optionally external
  image_path text, -- storage path
  created_at timestamptz not null default now(),
  uploaded_by uuid not null references auth.users (id) on delete cascade
);

-- Comments for every post
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete cascade,
  body text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists comments_post_id_idx on public.comments (post_id, created_at desc);

-- Likes/Dislikes with toggle + mutual exclusivity.
-- For simplicity we model as a single table with reaction in ('like','dislike').
-- target_type is 'post' or 'comment'.
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  target_type text not null check (target_type in ('post','comment')),
  target_id uuid not null,
  reaction text not null check (reaction in ('like','dislike')),
  created_at timestamptz not null default now(),

  unique (user_id, target_type, target_id) -- ensures like/dislike toggles per target
);

create index if not exists reactions_target_idx on public.reactions (target_type, target_id);

-- =============================
-- Follow clubs
-- =============================
create table if not exists public.club_follows (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs (id) on delete cascade,
  follower_user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (club_id, follower_user_id)
);

-- =============================
-- Polls
-- =============================
create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  is_active boolean not null default true,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls (id) on delete cascade,
  option_text text not null,
  sort_order int not null default 0,
  unique (poll_id, option_text)
);

create table if not exists public.poll_votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls (id) on delete cascade,
  option_id uuid not null references public.poll_options (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (poll_id, user_id) -- vote once per poll
);

-- =============================
-- Sports domain
-- =============================
create table if not exists public.sports (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.athletes (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid not null references public.sports (id) on delete cascade,
  name text not null,
  bio text,
  team text,
  created_at timestamptz not null default now()
);

create table if not exists public.sport_events (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid not null references public.sports (id) on delete cascade,
  title text not null,
  description text,
  event_type text not null default 'tournament' check (event_type in ('tournament','fixture','meet','match')),
  start_at timestamptz,
  end_at timestamptz,
  status text not null default 'scheduled' check (status in ('scheduled','live','completed')),
  live_stream_url text,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Past and future events are determined by start_at + status in UI.

-- Ranking tables: entries belong to a sport + a particular ranking table (e.g. latest or season)
create table if not exists public.ranking_tables (
  id uuid primary key default gen_random_uuid(),
  sport_id uuid not null references public.sports (id) on delete cascade,
  name text not null default 'Current Rankings',
  season text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.ranking_entries (
  id uuid primary key default gen_random_uuid(),
  ranking_table_id uuid not null references public.ranking_tables (id) on delete cascade,
  athlete_id uuid not null references public.athletes (id) on delete cascade,
  rank_no int not null,
  score text,
  created_at timestamptz not null default now(),

  unique (ranking_table_id, athlete_id)
);

-- Store videos related to sport events (past videos/post events)
create table if not exists public.sport_event_videos (
  id uuid primary key default gen_random_uuid(),
  sport_event_id uuid not null references public.sport_events (id) on delete cascade,
  title text,
  video_url text not null,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- =============================
-- Clubs: club-level video pages (optional mapping)
-- =============================
-- We already support club videos via posts + post_videos with club_id.

-- =============================
-- Themes catalog (5 themes)
-- =============================
create table if not exists public.theme_catalog (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  created_at timestamptz not null default now()
);

-- =============================
-- RLS helpers
-- =============================
create or replace function public.current_app_role()
returns text
language sql stable
as $$
  select coalesce((select role from public.app_profiles where id = auth.uid()), 'visitor')
$$;

create or replace function public.current_club_id()
returns uuid
language sql stable
as $$
  select club_id from public.app_profiles where id = auth.uid()
$$;

-- =============================
-- Enable RLS
-- =============================
-- Turn RLS on for all interactive tables.

alter table public.app_profiles enable row level security;
alter table public.clubs enable row level security;
alter table public.site_settings enable row level security;
alter table public.user_theme_preferences enable row level security;
alter table public.posts enable row level security;
alter table public.post_videos enable row level security;
alter table public.post_pictures enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;
alter table public.club_follows enable row level security;
alter table public.polls enable row level security;
alter table public.poll_options enable row level security;
alter table public.poll_votes enable row level security;
alter table public.sports enable row level security;
alter table public.athletes enable row level security;
alter table public.sport_events enable row level security;
alter table public.ranking_tables enable row level security;
alter table public.ranking_entries enable row level security;
alter table public.sport_event_videos enable row level security;
alter table public.theme_catalog enable row level security;

-- =============================
-- Policies
-- =============================
-- app_profiles: allow users to read/update their own; admins manage all.
create policy "profiles_select_self_or_admin"
on public.app_profiles
for select
using (
  id = auth.uid() or public.current_app_role() = 'site_admin'
);

create policy "profiles_update_self_or_admin"
on public.app_profiles
for update
using (
  id = auth.uid() or public.current_app_role() = 'site_admin'
)
with check (
  id = auth.uid() or public.current_app_role() = 'site_admin'
);

-- clubs: public can view; site_admin can manage; club_admin can manage only their club.
create policy "clubs_select_public" on public.clubs
for select
using (true);

create policy "clubs_insert_site_admin" on public.clubs
for insert
with check (public.current_app_role() = 'site_admin');

create policy "clubs_update_site_admin_or_own" on public.clubs
for update
using (
  public.current_app_role() = 'site_admin'
  or (public.current_app_role() = 'club_admin' and id = public.current_club_id())
)
with check (
  public.current_app_role() = 'site_admin'
  or (public.current_app_role() = 'club_admin' and id = public.current_club_id())
);

-- site_settings: only site_admin can update; public can read.
create policy "site_settings_select_public" on public.site_settings
for select
using (true);

create policy "site_settings_write_site_admin" on public.site_settings
for update
using (public.current_app_role() = 'site_admin')
with check (public.current_app_role() = 'site_admin');

create policy "site_settings_insert_site_admin" on public.site_settings
for insert
with check (public.current_app_role() = 'site_admin');

-- user_theme_preferences
create policy "theme_pref_select_own" on public.user_theme_preferences
for select
using (user_id = auth.uid());

create policy "theme_pref_upsert_own" on public.user_theme_preferences
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "theme_pref_insert_own" on public.user_theme_preferences
for insert
with check (user_id = auth.uid());

-- posts
create policy "posts_select_public" on public.posts
for select
using (published = true or public.current_app_role() = 'site_admin');

create policy "posts_insert_admin" on public.posts
for insert
with check (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and club_id = public.current_club_id()
  )
);

create policy "posts_update_admin" on public.posts
for update
using (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and club_id = public.current_club_id()
  )
)
with check (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and club_id = public.current_club_id()
  )
);

create policy "posts_delete_admin" on public.posts
for delete
using (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and club_id = public.current_club_id()
  )
);

-- post_videos
create policy "post_videos_select_public" on public.post_videos
for select
using (exists (select 1 from public.posts p where p.id = post_id and (p.published = true or public.current_app_role() = 'site_admin')));

create policy "post_videos_insert_admin" on public.post_videos
for insert
with check (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and exists (
      select 1 from public.posts p
      where p.id = post_id and p.club_id = public.current_club_id()
    )
  )
);

create policy "post_videos_update_admin" on public.post_videos
for update
using (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and exists (
      select 1 from public.posts p
      where p.id = post_id and p.club_id = public.current_club_id()
    )
  )
)
with check (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and exists (
      select 1 from public.posts p
      where p.id = post_id and p.club_id = public.current_club_id()
    )
  )
);

create policy "post_videos_delete_admin" on public.post_videos
for delete
using (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and exists (
      select 1 from public.posts p
      where p.id = post_id and p.club_id = public.current_club_id()
    )
  )
);

-- post_pictures
create policy "post_pictures_select_public" on public.post_pictures
for select
using (exists (select 1 from public.posts p where p.id = post_id and (p.published = true or public.current_app_role() = 'site_admin')));

create policy "post_pictures_insert_admin" on public.post_pictures
for insert
with check (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and exists (
      select 1 from public.posts p
      where p.id = post_id and p.club_id = public.current_club_id()
    )
  )
);

create policy "post_pictures_update_admin" on public.post_pictures
for update
using (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and exists (
      select 1 from public.posts p
      where p.id = post_id and p.club_id = public.current_club_id()
    )
  )
)
with check (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and exists (
      select 1 from public.posts p
      where p.id = post_id and p.club_id = public.current_club_id()
    )
  )
);

create policy "post_pictures_delete_admin" on public.post_pictures
for delete
using (
  public.current_app_role() = 'site_admin'
  or (
    public.current_app_role() = 'club_admin'
    and exists (
      select 1 from public.posts p
      where p.id = post_id and p.club_id = public.current_club_id()
    )
  )
);

-- comments
create policy "comments_select_public" on public.comments
for select
using (published = true and exists (select 1 from public.posts p where p.id = post_id and p.published = true));

create policy "comments_insert_visitor" on public.comments
for insert
with check (published = true and public.current_app_role() in ('site_admin','club_admin','visitor'));

create policy "comments_update_admin" on public.comments
for update
using (public.current_app_role() = 'site_admin')
with check (public.current_app_role() = 'site_admin');

-- Allow users to delete only their own? Requirement says admins edit everything; so visitors can’t delete/edit by default.

-- reactions
create policy "reactions_select_public" on public.reactions
for select
using (exists (
  select 1
  from public.posts p
  where (reactions.target_type='post' and p.id=reactions.target_id and p.published=true)
  or (reactions.target_type='comment' and exists (select 1 from public.comments c where c.id=reactions.target_id and c.published=true))
));

create policy "reactions_insert_upsert" on public.reactions
for insert
with check (public.current_app_role() in ('site_admin','club_admin','visitor'));

create policy "reactions_delete_self" on public.reactions
for delete
using (user_id = auth.uid());

create policy "reactions_update_self" on public.reactions
for update
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- club_follows
create policy "club_follows_select_public" on public.club_follows
for select
using (false); -- don’t expose follow graph publicly

create policy "club_follows_insert_visitor" on public.club_follows
for insert
with check (public.current_app_role() in ('site_admin','club_admin','visitor'));

create policy "club_follows_delete_self" on public.club_follows
for delete
using (follower_user_id = auth.uid());

-- polls
create policy "polls_select_public" on public.polls
for select
using (true);

create policy "polls_write_site_admin" on public.polls
for insert
with check (public.current_app_role() = 'site_admin');

create policy "polls_update_site_admin" on public.polls
for update
using (public.current_app_role() = 'site_admin')
with check (public.current_app_role() = 'site_admin');

create policy "polls_options_select_public" on public.poll_options
for select
using (true);

create policy "polls_options_write_site_admin" on public.poll_options
for insert
with check (public.current_app_role() = 'site_admin');

create policy "polls_options_update_site_admin" on public.poll_options
for update
using (public.current_app_role() = 'site_admin')
with check (public.current_app_role() = 'site_admin');

create policy "poll_votes_select_own" on public.poll_votes
for select
using (user_id = auth.uid() or public.current_app_role() = 'site_admin');

create policy "poll_votes_insert_visitor" on public.poll_votes
for insert
with check (public.current_app_role() in ('site_admin','club_admin','visitor'));

create policy "poll_votes_delete_self" on public.poll_votes
for delete
using (user_id = auth.uid());

-- sports
create policy "sports_select_public" on public.sports
for select using (true);

create policy "sports_write_admin" on public.sports
for insert with check (public.current_app_role() = 'site_admin');

create policy "sports_update_admin" on public.sports
for update using (public.current_app_role() = 'site_admin') with check (public.current_app_role() = 'site_admin');

-- athletes (site admin only for now)
create policy "athletes_select_public" on public.athletes
for select using (true);

create policy "athletes_write_admin" on public.athletes
for insert with check (public.current_app_role() = 'site_admin');

create policy "athletes_update_admin" on public.athletes
for update using (public.current_app_role() = 'site_admin') with check (public.current_app_role() = 'site_admin');

-- sport_events
create policy "sport_events_select_public" on public.sport_events
for select using (true);

create policy "sport_events_write_admin" on public.sport_events
for insert with check (public.current_app_role() = 'site_admin');

create policy "sport_events_update_admin" on public.sport_events
for update using (public.current_app_role() = 'site_admin') with check (public.current_app_role() = 'site_admin');

create policy "sport_events_delete_admin" on public.sport_events
for delete using (public.current_app_role() = 'site_admin');

-- ranking_tables
create policy "ranking_tables_select_public" on public.ranking_tables
for select using (true);

create policy "ranking_tables_write_admin" on public.ranking_tables
for insert with check (public.current_app_role() = 'site_admin');

create policy "ranking_tables_update_admin" on public.ranking_tables
for update using (public.current_app_role() = 'site_admin') with check (public.current_app_role() = 'site_admin');

create policy "ranking_tables_delete_admin" on public.ranking_tables
for delete using (public.current_app_role() = 'site_admin');

-- ranking_entries
create policy "ranking_entries_select_public" on public.ranking_entries
for select using (true);

create policy "ranking_entries_write_admin" on public.ranking_entries
for insert with check (public.current_app_role() = 'site_admin');

create policy "ranking_entries_update_admin" on public.ranking_entries
for update using (public.current_app_role() = 'site_admin') with check (public.current_app_role() = 'site_admin');

create policy "ranking_entries_delete_admin" on public.ranking_entries
for delete using (public.current_app_role() = 'site_admin');

-- sport_event_videos
create policy "sport_event_videos_select_public" on public.sport_event_videos
for select using (true);

create policy "sport_event_videos_write_admin" on public.sport_event_videos
for insert with check (public.current_app_role() = 'site_admin');

create policy "sport_event_videos_update_admin" on public.sport_event_videos
for update using (public.current_app_role() = 'site_admin') with check (public.current_app_role() = 'site_admin');

create policy "sport_event_videos_delete_admin" on public.sport_event_videos
for delete using (public.current_app_role() = 'site_admin');

-- theme_catalog
create policy "theme_catalog_select_public" on public.theme_catalog
for select using (true);

create policy "theme_catalog_write_admin" on public.theme_catalog
for insert with check (public.current_app_role() = 'site_admin');

create policy "theme_catalog_update_admin" on public.theme_catalog
for update using (public.current_app_role() = 'site_admin') with check (public.current_app_role() = 'site_admin');

-- =============================
-- Triggers to update updated_at
-- =============================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();

-- =============================
-- Seed (optional, kept minimal)
-- =============================
-- Insert a default theme catalog rows (5 themes)
insert into public.theme_catalog (slug, name)
values
  ('sky','Skyline'),
  ('emerald','Emerald'),
  ('violet','Violet'),
  ('amber','Amber'),
  ('rose','Rose')
on conflict (slug) do nothing;

