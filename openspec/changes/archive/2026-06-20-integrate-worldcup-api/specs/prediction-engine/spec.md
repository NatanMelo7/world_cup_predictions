## MODIFIED Requirements

### Requirement: Prediction Submission
The system SHALL allow users to submit predictions for upcoming matches sourced from the external API. Matches with `time_elapsed` not equal to "notstarted" are locked.

#### Scenario: Successful Prediction
- **WHEN** user submits a prediction for a match whose time_elapsed is "notstarted"
- **THEN** system saves the prediction

### Requirement: Prediction Lock
The system SHALL lock predictions when the match time_elapsed field is no longer "notstarted".

#### Scenario: Block Prediction
- **WHEN** user tries to submit a prediction for a match whose time_elapsed is not "notstarted"
- **THEN** system rejects the submission
