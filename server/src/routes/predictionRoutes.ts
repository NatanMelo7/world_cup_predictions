import { Router, Request, Response } from 'express';
import { submitPrediction, submitBulkPredictions } from '../services/predictionService';
import { checkAndAwardAchievements } from '../services/achievementService';
import prisma from '../db';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { userId, matchId, predictedScoreA, predictedScoreB } = req.body;

    const prediction = await submitPrediction({
      userId,
      matchId,
      predictedScoreA,
      predictedScoreB,
    });

    await checkAndAwardAchievements(userId);
    res.status(201).json(prediction);
  } catch (error: any) {
    if (error.message?.includes('locked')) {
      res.status(403).json({ error: error.message });
      return;
    }
    if (error.message?.includes('not found')) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/bulk', async (req: Request, res: Response) => {
  try {
    const { userId, predictions } = req.body;

    const results = await submitBulkPredictions({ userId, predictions });

    const anySuccess = results.some(r => r.success);
    if (anySuccess) {
      await checkAndAwardAchievements(userId);
    }

    res.status(200).json({ results });
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const predictions = await prisma.prediction.findMany({
      where: { userId: req.params.userId },
      include: { match: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json(predictions);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/upcoming', async (_req: Request, res: Response) => {
  try {
    const matches = await prisma.match.findMany({
      where: { timeElapsed: 'notstarted' },
      orderBy: { matchDate: 'asc' },
    });

    res.json(matches);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
