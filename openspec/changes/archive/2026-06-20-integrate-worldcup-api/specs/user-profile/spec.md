## MODIFIED Requirements

### Requirement: User Account Creation
The system SHALL allow users to create an account using only a display name. No email or password is required.

#### Scenario: Successful Registration
- **WHEN** user provides a display name
- **THEN** system creates an account, stores the ID in localStorage, and logs user in

### Requirement: Profile Management
The system SHALL allow users to update their display name and select a favorite team.

#### Scenario: Update Display Name
- **WHEN** user updates their display name
- **THEN** system persists the new name

#### Scenario: Select Favorite Team
- **WHEN** user selects a favorite team from the available teams list
- **THEN** system saves the team preference and displays its flag on the profile
