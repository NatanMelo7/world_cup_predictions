## ADDED Requirements

### Requirement: Name-Only Registration
The system SHALL allow users to register with only a display name.

#### Scenario: Quick registration
- **WHEN** user provides a display name
- **THEN** system creates an account and returns a user ID stored in the browser

### Requirement: Session Persistence
The system SHALL persist user session via browser localStorage.

#### Scenario: Returning user
- **WHEN** a user with a stored ID returns to the site
- **THEN** the system recognizes them and loads their profile without re-registration
