## Why

The current lack of a centralized, interactive platform for World Cup predictions prevents users from engaging deeply with the event. This system solves this by providing a gamified experience, driving participation through predictions, XP earning, and competitive leaderboards.

## What Changes

- Implement user account registration and profile management.
- Develop a prediction engine for match results.
- Create an XP system with leveling.
- Build a leaderboard system for global, weekly, and phase-specific rankings.
- Introduce an achievement system (badges).
- Allow special predictions (champion, artilheiro, etc.).

## Capabilities

### New Capabilities
- `user-profile`: Handles user registration, display settings, and profile visualization.
- `prediction-engine`: Manages submission of predictions and locks them after match start.
- `xp-system`: Defines rewards based on prediction accuracy and level progression.
- `leaderboard`: Renders rankings based on XP and specific criteria.
- `achievements`: Unlocks badges based on user performance milestones.

### Modified Capabilities
- 

## Impact

- New database schema for Users, Matches, Predictions, XP/Levels, and Achievements.
- New API endpoints for managing predictions, profiles, and querying rankings.
- Frontend development for user dashboards, prediction forms, and leaderboard views.
