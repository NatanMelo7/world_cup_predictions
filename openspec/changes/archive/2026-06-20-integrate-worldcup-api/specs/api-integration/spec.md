## ADDED Requirements

### Requirement: Fetch Groups
The system SHALL fetch all World Cup groups from the external API.

#### Scenario: Successful group sync
- **WHEN** the sync service runs
- **THEN** groups (A-L) are stored in the database with their names and IDs

### Requirement: Fetch Teams
The system SHALL fetch all teams from the external API, including their flags and group assignment.

#### Scenario: Team data populated
- **WHEN** teams are fetched from the API
- **THEN** each team is stored with its name, flag URL, and group reference

### Requirement: Fetch Matches
The system SHALL fetch all matches from the external API including scores and status.

#### Scenario: Match list populated
- **WHEN** matches are fetched from the API
- **THEN** all 104 matches are stored with teams, dates, scores, and finished status

### Requirement: Periodic Sync
The system SHALL periodically resync data from the external API.

#### Scenario: Scores update after match
- **WHEN** a match finishes and the API reflects updated scores
- **THEN** the next sync cycle updates local match data with new scores
