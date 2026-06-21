## ADDED Requirements

### Requirement: Prediction Submission
The system SHALL allow users to submit predictions for upcoming matches.

#### Scenario: Successful Prediction
- **WHEN** user submits a prediction for a future match
- **THEN** system saves the prediction

### Requirement: Prediction Lock
The system SHALL lock predictions after the match begins.

#### Scenario: Block Prediction
- **WHEN** user tries to submit a prediction for a match that has already started
- **THEN** system rejects the submission
