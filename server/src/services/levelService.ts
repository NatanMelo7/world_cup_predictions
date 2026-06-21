import prisma from '../db';

export async function getLevelForXP(xp: number): Promise<number> {
  const thresholds = await prisma.levelThreshold.findMany({
    orderBy: { xpRequired: 'desc' },
  });

  for (const threshold of thresholds) {
    if (xp >= threshold.xpRequired) {
      return threshold.level;
    }
  }

  return 1;
}

export async function updateUserLevel(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { xp: true },
  });

  if (!user) return;

  const newLevel = await getLevelForXP(user.xp);

  await prisma.user.update({
    where: { id: userId },
    data: { level: newLevel },
  });
}
