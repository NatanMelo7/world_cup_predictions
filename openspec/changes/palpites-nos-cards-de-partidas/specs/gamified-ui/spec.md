## MODIFIED Requirements

### Requirement: Visual Match Cards
The system SHALL display matches as visual cards with team flags, names, VS layout, and inline score prediction inputs for upcoming matches.

#### Scenario: Match listing with prediction inputs
- **WHEN** user views the predictions page
- **THEN** upcoming matches are displayed in a card grid with flags, formatted dates, and two numeric score inputs per card

#### Scenario: Match listing without inputs for locked matches
- **WHEN** a match is no longer open for predictions
- **THEN** the card is displayed without score inputs, showing only team flags, names, and match info
