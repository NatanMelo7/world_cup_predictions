import prisma from '../db';

const XP_EXACT_SCORE = 50;
const XP_GOAL_DIFFERENCE = 20;
const XP_WINNER_OR_DRAW = 10;

export function calculateXP(
  predictedScoreA: number,
  predictedScoreB: number,
  actualScoreA: number,
  actualScoreB: number
): number {
  const predictedResult = getResult(predictedScoreA, predictedScoreB);
  const actualResult = getResult(actualScoreA, actualScoreB);

  if (predictedScoreA === actualScoreA && predictedScoreB === actualScoreB) {
    return XP_EXACT_SCORE;
  }

  const predictedDiff = predictedScoreA - predictedScoreB;
  const actualDiff = actualScoreA - actualScoreB;

  if (predictedDiff === actualDiff) {
    return XP_GOAL_DIFFERENCE;
  }

  if (predictedResult === actualResult) {
    return XP_WINNER_OR_DRAW;
  }

  return 0;
}

type MatchResult = 'winA' | 'winB' | 'draw';

function getResult(scoreA: number, scoreB: number): MatchResult {
  if (scoreA > scoreB) return 'winA';
  if (scoreB > scoreA) return 'winB';
  return 'draw';
}

export async function processMatchResults(matchId: string, scoreA: number, scoreB: number) {
  const predictions = await prisma.prediction.findMany({
    where: { matchId },
  });

  for (const prediction of predictions) {
    const xp = calculateXP(
      prediction.predictedScoreA,
      prediction.predictedScoreB,
      scoreA,
      scoreB
    );

    if (xp > 0) {
      await prisma.prediction.update({
        where: { id: prediction.id },
        data: { xpEarned: xp },
      });

      await prisma.user.update({
        where: { id: prediction.userId },
        data: { xp: { increment: xp } },
      });
    }
  }
}
