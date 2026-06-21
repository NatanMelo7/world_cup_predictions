## ADDED Requirements

### Requirement: Bulk prediction submission endpoint
The system SHALL provide a backend endpoint that accepts multiple predictions in a single HTTP request.

#### Scenario: Successful bulk submission
- **WHEN** a POST request with an array of predictions is sent to `/api/predictions/bulk`
- **THEN** the system processes each prediction individually and returns an array with each prediction's result (success or error with message)

#### Scenario: Partial failure in bulk submission
- **WHEN** one prediction in the bulk array fails validation (e.g., locked match)
- **THEN** the system still processes the remaining predictions and returns per-item success/error status

### Requirement: Bulk confirmation button
The system SHALL display a "Confirmar Palpites" button that submits all filled predictions at once.

#### Scenario: Button enabled with filled predictions
- **WHEN** at least one match card has both score fields filled
- **THEN** the "Confirmar Palpites" button is enabled

#### Scenario: Button disabled when no predictions filled
- **WHEN** no match card has both score fields filled
- **THEN** the "Confirmar Palpites" button is disabled

#### Scenario: Submit all filled predictions
- **WHEN** user clicks "Confirmar Palpites"
- **THEN** all prediction pairs (matchId, scoreA, scoreB) with both fields filled are sent to the bulk endpoint

### Requirement: Per-card feedback after bulk submission
The system SHALL display per-card visual feedback after bulk submission completes.

#### Scenario: Success feedback on card
- **WHEN** a prediction in the bulk submission succeeds
- **THEN** the corresponding match card shows a green checkmark or success indicator

#### Scenario: Error feedback on card
- **WHEN** a prediction in the bulk submission fails
- **THEN** the corresponding match card shows a red error indicator with the error reason
