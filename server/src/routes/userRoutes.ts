import { Router, Request, Response } from 'express';
import prisma from '../db';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { displayName } = req.body;

    if (!displayName || displayName.trim().length === 0) {
      res.status(400).json({ error: 'Display name is required' });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { displayName } });
    if (existing) {
      res.status(409).json({ error: 'Name already taken' });
      return;
    }

    const user = await prisma.user.create({
      data: { displayName },
      select: { id: true, displayName: true, xp: true, level: true },
    });

    res.status(201).json(user);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        displayName: true,
        avatarUrl: true,
        xp: true,
        level: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { displayName, avatarUrl } = req.body;

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { displayName, avatarUrl },
      select: { id: true, displayName: true, avatarUrl: true },
    });

    res.json(user);
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
