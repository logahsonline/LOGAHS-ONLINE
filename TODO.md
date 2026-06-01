# LOGAHS ONLINE — Implementation TODO

## Backend (Supabase + RBAC)
- [x] Create Supabase schema/tables for roles, clubs, posts/media, comments, likes/dislikes, follows, polls, sports, rankings, athletes, events, media, themes, site settings.
- [ ] Confirm/test RLS for each table (site_admin vs club_admin vs visitor)
- [ ] Configure Supabase Storage buckets + RLS (if used)

## Frontend (Next.js routes)
- [ ] Implement theme integration + active theme persistence UI

## Admin portals
- [ ] Site admin portal (/admin):
  - [ ] Theme + site settings page
  - [ ] Clubs CRUD
  - [ ] Sports CRUD (sports, athletes, events, ranking tables/entries, sport videos)
  - [ ] Polls CRUD (polls, options) + vote results
  - [ ] Moderation UI for posts/comments/media (approve/publish/delete as permitted)
- [ ] Club admin portal (/club-admin/[clubSlug]):
  - [ ] Club dashboard
  - [ ] Manage club posts/media
  - [ ] Club-specific poll management if permitted
  - [ ] Limited moderation

## Shared dynamic layout modules
- [ ] Shared admin layout + navigation components
- [ ] Shared club admin layout + navigation components

## Quality
- [ ] Run dev server and verify CRUD flows

