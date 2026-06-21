import prisma from '../db';

const API_BASE = 'http://worldcup26.ir:3050';

async function fetchAPI(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`API error: ${res.status} ${path}`);
  return res.json();
}

interface ApiGroup {
  _id: string;
  name: string;
}

interface ApiTeam {
  _id: string;
  name_en: string;
  flag: string;
  groups: string;
}

interface ApiGame {
  id: string;
  home_team_name_en?: string;
  away_team_name_en?: string;
  home_team_label?: string;
  away_team_label?: string;
  home_flag?: string;
  away_flag?: string;
  home_score: string;
  away_score: string;
  group: string;
  local_date: string;
  date: string;
  finished: string;
  time_elapsed: string;
}

export async function syncGroups() {
  const data = await fetchAPI('/get/groups');
  const groups: ApiGroup[] = data.groups || [];

  for (const g of groups) {
    await prisma.group.upsert({
      where: { id: g._id },
      create: { id: g._id, name: g.name },
      update: { name: g.name },
    });
  }
}

export async function syncTeams() {
  const data = await fetchAPI('/get/teams');
  const teams: ApiTeam[] = data.teams || [];

  for (const t of teams) {
    const group = await prisma.group.findFirst({ where: { name: t.groups } });
    const groupId = group?.id || t.groups;

    await prisma.team.upsert({
      where: { id: t._id },
      create: { id: t._id, name: t.name_en, flag: t.flag, groupId },
      update: { name: t.name_en, flag: t.flag, groupId },
    });
  }
}

export async function syncMatches() {
  try {
    const data = await fetchAPI('/get/games');
    const games: ApiGame[] = data.games || [];

    const teams = await prisma.team.findMany();
    const teamMap = new Map(teams.map(t => [t.name, { flag: t.flag, id: t.id }]));

    for (const g of games) {
      const teamA = g.home_team_name_en || g.home_team_label || 'TBD';
      const teamB = g.away_team_name_en || g.away_team_label || 'TBD';
      const flagA = teamMap.get(teamA)?.flag || g.home_flag || null;
      const flagB = teamMap.get(teamB)?.flag || g.away_flag || null;
      const matchDate = g.date ? new Date(g.date) : new Date();

      const scoreA = g.home_score && g.home_score !== 'null' ? parseInt(g.home_score) : null;
      const scoreB = g.away_score && g.away_score !== 'null' ? parseInt(g.away_score) : null;

      await prisma.match.upsert({
        where: { externalId: g.id },
        create: {
          externalId: g.id,
          teamA,
          teamB,
          flagA,
          flagB,
          matchDate,
          phase: g.group,
          timeElapsed: g.time_elapsed,
          scoreA,
          scoreB,
        },
        update: {
          teamA,
          teamB,
          flagA,
          flagB,
          matchDate,
          phase: g.group,
          timeElapsed: g.time_elapsed,
          scoreA,
          scoreB,
        },
      });
    }
    console.log(`[Sync] Synced ${games.length} matches.`);
  } catch (err) {
    console.error('[Sync] Error syncing matches:', err);
  }
}

export async function runFullSync() {
  console.log('[Sync] Starting full sync...');
  try {
    await syncGroups();
    await syncTeams();
    await syncMatches();
    console.log('[Sync] Full sync complete.');
  } catch (err) {
    console.error('[Sync] Error:', err);
  }
}

let syncInterval: ReturnType<typeof setInterval> | null = null;

export function startPeriodicSync(intervalMs = 60000) {
  runFullSync();
  syncInterval = setInterval(runFullSync, intervalMs);
}

export function stopPeriodicSync() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
}
