## Context

The existing platform stores matches manually. We're integrating with the worldcup26.ir external API to auto-fetch groups, teams, matches, and scores. Registration is being simplified to remove email. The frontend is being redesigned for a game-like experience.

## Goals / Non-Goals

**Goals:**
- Auto-sync match data from external API on a configurable interval.
- Simplify registration to display-name-only with no email barrier.
- Transform UI into a gamified experience with animations, XP popups, progress bars.

**Non-Goals:**
- Real-time WebSocket integration (polling is sufficient).
- Using the external API's auth system (we keep our own user store).
- Mobile native app (responsive web only).

## Decisions

- **API Sync Strategy:** Polling every 60 seconds with a server-side setInterval. Store API data in our own database to avoid rate limits and latency on reads.
- **API Base URL:** `http://worldcup26.ir:3050` (production server per API docs). Fallback to `https://worldcup26.ir`.
- **Match Locking:** Replace Prisma enum-based status check with `time_elapsed` field from API (`notstarted` = open, anything else = locked).
- **Registration:** Remove email/password. Generate a random token stored in localStorage. User is identified by a UUID + display name. No authentication server-side needed for MVP.
- **Gamified UI:** CSS animations and React state for XP celebration, level-up effects, progress bars. Use emoji/flags for team representation.

## Risks / Trade-offs

- **Risk:** External API downtime breaks match data. → **Mitigation:** Cache last successful fetch; show "loading" state in UI; allow manual match entry as fallback.
- **Risk:** No auth (token in localStorage) is insecure for production. → **Mitigation:** Acceptable for MVP/game context; can add proper auth layer later.
