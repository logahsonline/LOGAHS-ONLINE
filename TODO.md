# LOGAHS ONLINE — Implementation TODO

## Backend (Supabase + RBAC)
- [x] Create Supabase schema/tables for roles, clubs, posts, comments, likes/dislikes, follows, polls, sports, rankings, athletes, events, media, themes, site settings.
- [ ] Configure Row Level Security (RLS):
  - [ ] Confirm/test RLS for each table (site_admin vs club_admin vs visitor)
  - [ ] Add missing club-scoped permissions for club admins on sports and related objects if desired
- [ ] Configure Supabase Storage buckets:
  - [ ] images
  - [ ] videos
  - [ ] club-logos + site-logos
  - [ ] RLS/policies for upload/download
- [ ] Create/adjust seed data:
  - [ ] Replace placeholders in `supabase/seed.sql` with real auth user emails
  - [ ] Seed initial site settings + theme catalog

## Frontend (Next.js routes)
- [ ] Implement global layout:
  - [ ] Theme provider (5 themes, dark/light toggle, admin switch)
  - [ ] Auth gate UI for /admin and /club-admin/[clubSlug]
- [ ] Public pages:
  - [ ] Home (replace placeholder root page)
  - [ ] News (list + detail + comments)
  - [ ] Future Events
  - [ ] Clubs directory
  - [ ] Club page with club logo + follow/unfollow + video pages + videos/updates
  - [ ] Sports index + sport pages (Chess, Basketball, Soccer, Volleyball, Handball, Bible Quiz, Netball, Running Events)
  - [ ] Post detail page (comments + like/dislike + downloads)
  - [ ] Polls list + poll voting

## Admin portals
- [ ] Site admin portal (/admin):
  - [ ] Change site name + top logos
  - [ ] Change active theme
  - [ ] CRUD: posts/media/pictures/videos/comments moderation
  - [ ] CRUD: clubs (create more clubs)
  - [ ] CRUD: sports domain data (rankings, athletes, events, live links, past videos)
  - [ ] CRUD: polls
- [ ] Club admin portal (/club-admin/[clubSlug]):
  - [ ] Edit only club content (logo, videos, club-scoped posts)
  - [ ] No access to site-level content

## Themes
- [ ] Implement 5 themes with light/dark variants.
- [ ] Admin selects active theme (stored in DB).
- [ ] Visitor toggle persists (cookie/DB preference).

## Quality & test
- [ ] Run dev server, verify full CRUD flows.
- [ ] Verify RBAC boundaries.
- [ ] Verify like/dislike toggles.
- [ ] Verify follow/unfollow and poll reverse rules.
- [ ] Verify downloads work on mobile/desktop.
- [ ] Verify responsive layouts.

