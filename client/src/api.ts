const API = import.meta.env.VITE_API_URL || '/api';

export async function register(displayName: string) {
  const res = await fetch(`${API}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ displayName }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }
  return res.json();
}

export async function getUser(id: string) {
  const res = await fetch(`${API}/users/${id}`);
  return res.json();
}

export async function getUpcomingMatches() {
  const res = await fetch(`${API}/predictions/upcoming`);
  return res.json();
}

export async function submitPrediction(userId: string, matchId: string, predictedScoreA: number, predictedScoreB: number) {
  const res = await fetch(`${API}/predictions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, matchId, predictedScoreA, predictedScoreB }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }
  return res.json();
}

export interface BulkPredictionItem {
  matchId: string;
  predictedScoreA: number;
  predictedScoreB: number;
}

export interface BulkPredictionResultItem {
  matchId: string;
  success: boolean;
  error?: string;
}

export async function bulkSubmitPredictions(userId: string, predictions: BulkPredictionItem[]) {
  const res = await fetch(`${API}/predictions/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, predictions }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
  }
  const data = await res.json();
  return data.results as BulkPredictionResultItem[];
}

export async function getUserPredictions(userId: string) {
  const res = await fetch(`${API}/predictions/user/${userId}`);
  return res.json();
}

export async function getGlobalRanking() {
  const res = await fetch(`${API}/leaderboard/global`);
  return res.json();
}

export async function getUserAchievements(userId: string) {
  const res = await fetch(`${API}/achievements/user/${userId}`);
  return res.json();
}

export function getStoredUserId(): string | null {
  return localStorage.getItem('userId');
}

export function storeUserId(id: string) {
  localStorage.setItem('userId', id);
}
