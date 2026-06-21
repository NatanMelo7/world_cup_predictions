## 1. Schema Changes

- [x] 1.1 Remove email and passwordHash from User model; make displayName unique
- [x] 1.2 Add externalId, flagA, flagB, timeElapsed fields to Match model
- [x] 1.3 Add Team model (id, name, flag, group) and Group model
- [x] 1.4 Generate migration and regenerate Prisma client

## 2. API Integration Service

- [x] 2.1 Create external API client (worldcup26.ir:3050) with fetch wrapper
- [x] 2.2 Implement syncGroups() — fetch /get/groups, upsert into DB
- [x] 2.3 Implement syncTeams() — fetch /get/teams, upsert with group reference
- [x] 2.4 Implement syncMatches() — fetch /get/games, upsert with team names, flags, time_elapsed
- [x] 2.5 Add periodic sync (setInterval 60s) that runs syncGroups + syncTeams + syncMatches
- [x] 2.6 Trigger initial sync on server startup

## 3. Simple Auth (No Email)

- [x] 3.1 Update /api/users/register to accept only displayName; remove email/password
- [x] 3.2 Return userId to frontend; frontend stores in localStorage
- [x] 3.3 Update Profile page to load user from localStorage userId
- [x] 3.4 Remove email from client registration form; single-input name field

## 4. Prediction Engine Changes

- [x] 4.1 Update Match locking to use timeElapsed field instead of MatchStatus enum
- [x] 4.2 Update prediction submission to check time_elapsed !== "notstarted"
- [x] 4.3 Expose matches via /api/predictions/upcoming using synced data

## 5. Gamified Frontend

- [x] 5.1 Apply dark theme with neon accents, gradients, rounded cards (CSS)
- [x] 5.2 Redesign match listing as flag-based VS cards with group info
- [x] 5.3 Add XP celebration popup component (animated +XP overlay)
- [x] 5.4 Add level progress bar component (XP-to-next-level percentage)
- [x] 5.5 Redesign leaderboard with ranked cards and user highlight
- [x] 5.6 Redesign prediction form as game-like card with score sliders/inputs

## 6. Cleanup

- [x] 6.1 Remove unused MatchStatus enum and old manual-match fields from schema
- [x] 6.2 Remove bcrypt, email validation, and unused auth dependencies
