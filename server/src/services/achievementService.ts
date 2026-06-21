import prisma from '../db';

const FIRST_PREDICTION_BADGE = 'First Steps';

export async function checkAndAwardAchievements(userId: string) {
  const predictionCount = await prisma.prediction.count({
    where: { userId },
  });

  if (predictionCount === 1) {
    const badge = await prisma.achievement.findUnique({
      where: { name: FIRST_PREDICTION_BADGE },
    });

    if (badge) {
      await prisma.userAchievement.upsert({
        where: {
          userId_achievementId: {
            userId,
            achievementId: badge.id,
          },
        },
        create: {
          userId,
          achievementId: badge.id,
        },
        update: {},
      });
    }
  }
}
