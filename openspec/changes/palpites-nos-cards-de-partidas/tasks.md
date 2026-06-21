## 1. Backend: Bulk Prediction Endpoint

- [x] 1.1 Add `submitBulkPredictions` function to `predictionService.ts` that accepts `{ userId, predictions: [{ matchId, predictedScoreA, predictedScoreB }] }`, processes each individually, and returns per-item `{ matchId, success: boolean, error?: string }` results
- [x] 1.2 Add `POST /api/predictions/bulk` route in `predictionRoutes.ts` calling `submitBulkPredictions`
- [x] 1.3 Trigger `checkAndAwardAchievements` once after bulk processing completes (not per-item)

## 2. Frontend: API Client

- [x] 2.1 Add `bulkSubmitPredictions(userId, predictions)` function to `client/src/api.ts` calling `POST /api/predictions/bulk`

## 3. Frontend: Refactor Predictions Page

- [x] 3.1 Remove the existing `<form>` block (select dropdown, individual score inputs, "Enviar Palpite" button) from `Predictions.tsx`
- [x] 3.2 Add score input state as `Record<string, { scoreA: number; scoreB: number }>` (`predictions` state)
- [x] 3.3 Add two compact numeric inputs inside each `.match-card` for matches where `timeElapsed === "notstarted"`
- [x] 3.4 Add "Confirmar Palpites" button below the match grid, enabled only when at least one match has both scores filled
- [x] 3.5 Implement `handleBulkSubmit` — filters predictions with both scores filled, calls `bulkSubmitPredictions`, shows per-card success/error feedback
- [x] 3.6 Add per-card feedback UI: green border/checkmark on success, red border with error message on failure
- [x] 3.7 Show XP popup on successful bulk submission

## 4. CSS: Match Card Updates

- [x] 4.1 Add `.match-score-inputs` container style inside `.match-card` for the two score inputs (flexbox, centered, compact)
- [x] 4.2 Reuse existing `.score-input` class for inline inputs; constrain width to 50px
- [x] 4.3 Add `.match-card.success` and `.match-card.error` border color styles for feedback states
- [x] 4.4 Add `.match-card.incomplete` style (amber border) for cards with only one score filled
- [x] 4.5 Style the "Confirmar Palpites" button prominently below the grid (full-width, accent color)
