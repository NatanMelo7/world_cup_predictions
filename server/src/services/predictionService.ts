import prisma from '../db';

export interface SubmitPredictionInput {
  userId: string;
  matchId: string;
  predictedScoreA: number;
  predictedScoreB: number;
}

export interface BulkPredictionResult {
  matchId: string;
  success: boolean;
  error?: string;
}

export interface BulkSubmitInput {
  userId: string;
  predictions: Array<{
    matchId: string;
    predictedScoreA: number;
    predictedScoreB: number;
  }>;
}

export async function submitPrediction(input: SubmitPredictionInput) {
  const match = await prisma.match.findUnique({
    where: { id: input.matchId },
  });

  if (!match) {
    throw new Error('Match not found');
  }

  if (match.timeElapsed !== 'notstarted') {
    throw new Error('Predictions are locked for matches that have started or finished');
  }

  const prediction = await prisma.prediction.upsert({
    where: {
      userId_matchId: {
        userId: input.userId,
        matchId: input.matchId,
      },
    },
    create: {
      userId: input.userId,
      matchId: input.matchId,
      predictedScoreA: input.predictedScoreA,
      predictedScoreB: input.predictedScoreB,
    },
    update: {
      predictedScoreA: input.predictedScoreA,
      predictedScoreB: input.predictedScoreB,
    },
  });

  return prediction;
}

export async function submitBulkPredictions(input: BulkSubmitInput): Promise<BulkPredictionResult[]> {
  const results: BulkPredictionResult[] = [];

  for (const p of input.predictions) {
    try {
      await submitPrediction({
        userId: input.userId,
        matchId: p.matchId,
        predictedScoreA: p.predictedScoreA,
        predictedScoreB: p.predictedScoreB,
      });
      results.push({ matchId: p.matchId, success: true });
    } catch (err: any) {
      results.push({ matchId: p.matchId, success: false, error: err.message });
    }
  }

  return results;
}
