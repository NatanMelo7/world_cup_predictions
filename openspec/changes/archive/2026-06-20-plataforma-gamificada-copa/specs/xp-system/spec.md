## ADDED Requirements

### Requirement: XP Calculation
The system SHALL award XP based on prediction accuracy.

#### Scenario: Exact Score
- **WHEN** user guesses the exact score
- **THEN** system awards 50 XP

### Requirement: Level Progression
The system SHALL increase user level based on accumulated XP.

#### Scenario: Level Up
- **WHEN** user reaches required XP for next level
- **THEN** system updates user level
