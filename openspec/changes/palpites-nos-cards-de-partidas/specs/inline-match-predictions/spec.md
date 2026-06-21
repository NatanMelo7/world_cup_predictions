## ADDED Requirements

### Requirement: Score inputs on match cards
The system SHALL display two numeric input fields (score A and score B) directly on each upcoming match card in the predictions page grid.

#### Scenario: Inputs visible on upcoming match cards
- **WHEN** user views the predictions page
- **THEN** each match card with `timeElapsed === "notstarted"` displays two compact numeric inputs for team A score and team B score

#### Scenario: Inputs hidden for locked matches
- **WHEN** a match has `timeElapsed !== "notstarted"`
- **THEN** the match card does not display score inputs

#### Scenario: Input values stored in local state
- **WHEN** user types a score value in a match card input
- **THEN** the value is stored in the page's local state associated with that match ID

### Requirement: Visual feedback for incomplete predictions
The system SHALL highlight match cards where only one of the two score fields is filled.

#### Scenario: Card with partial fill
- **WHEN** user fills only the team A score input on a match card
- **THEN** the card displays a visual warning indicator (e.g., amber border) prompting user to fill both scores

### Requirement: Remove legacy prediction form
The system SHALL remove the single-prediction select-and-submit form from the predictions page.

#### Scenario: Old form absent
- **WHEN** user visits the predictions page
- **THEN** the `<select>` dropdown and single-submit "Enviar Palpite" form are not present
