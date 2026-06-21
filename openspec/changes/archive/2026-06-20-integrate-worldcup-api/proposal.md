## Why

Manual match registration and a plain UI limits engagement and creates friction. By integrating live match data from the worldcup26.ir API and removing the email barrier from signup, along with a game-like interface, we eliminate setup work and boost adoption.

## What Changes

- Integrate external API (worldcup26.ir) to fetch groups, teams, matches, and scores automatically.
- **BREAKING**: Remove email requirement from user registration — only display name needed.
- Replace static UI with gamified interface (animations, visual feedback, XP pop-ups, progress bars).
- Sync match status and results from external API periodically.

## Capabilities

### New Capabilities
- `api-integration`: Fetches and syncs groups, teams, matches, and scores from the worldcup26.ir external API.
- `simple-auth`: Passwordless authentication with only display name — no email required.
- `gamified-ui`: Game-like frontend with animations, sound effects, XP celebration pop-ups, level progress bars, and playful visual identity.

### Modified Capabilities
- `user-profile`: Remove email field from registration; add team flag/favorite team selection.
- `prediction-engine`: Match data now comes from external API sync instead of manual entry; match locking based on `time_elapsed` field from API.

## Impact

- New external API service layer in backend.
- Database schema changes: remove email uniqueness, add API-sourced match data fields (team flags).
- Frontend redesigned with gamification visuals (CSS animations, iconography, interactive elements).
- New dependency: periodic API sync polling or cron job.
