## MODIFIED Requirements

### Requirement: Prediction Submission
The system SHALL allow users to submit predictions for upcoming matches sourced from the external API, both individually and in bulk. Matches with `time_elapsed` not equal to "notstarted" are locked.

#### Scenario: Successful single prediction
- **WHEN** user submits a single prediction for a match whose time_elapsed is "notstarted"
- **THEN** system saves the prediction

#### Scenario: Successful bulk prediction
- **WHEN** user submits multiple predictions via the bulk endpoint for matches whose time_elapsed is "notstarted"
- **THEN** system saves each valid prediction and returns per-item results

#### Scenario: Bulk with mixed locked/unlocked matches
- **WHEN** a bulk submission includes both locked and unlocked matches
- **THEN** system saves predictions for unlocked matches and rejects predictions for locked matches with individual error messages
