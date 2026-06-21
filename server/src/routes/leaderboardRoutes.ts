import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

router.get('/global', async (_req: Request, res: Response) => {
  try {
    const rankings = await prisma.user.findMany({
      select: {
        id: true,
        displayName: true,
        xp: true,
        level: true,
        createdAt: true,
        _count: {
          select: {
            predictions: {
              where: { xpEarned: 50 },
            },
          },
        },
      },
      orderBy: [
        { xp: 'desc' },
        { createdAt: 'asc' },
      ],
    });

    res.json(rankings);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/phase/:phase', async (req: Request, res: Response) => {
  try {
    const phase = req.params.phase;

    const rankings = await prisma.user.findMany({
      select: {
        id: true,
        displayName: true,
        xp: true,
        level: true,
        createdAt: true,
      },
      orderBy: [
        { xp: 'desc' },
        { createdAt: 'asc' },
      ],
    });

    res.json(rankings);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
