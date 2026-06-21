import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const achievements = await prisma.userAchievement.findMany({
      where: { userId: req.params.userId },
      include: { achievement: true },
      orderBy: { unlockedAt: 'desc' },
    });

    res.json(achievements);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
