import { useEffect, useState } from 'react';
import { getGlobalRanking, getStoredUserId } from '../api';

interface RankingEntry {
  id: string;
  displayName: string;
  xp: number;
  level: number;
}

export default function Leaderboard() {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const myId = getStoredUserId();

  useEffect(() => { getGlobalRanking().then(setRankings); }, []);

  return (
    <div className="card">
      <h1>🏆 Ranking Global</h1>
      {rankings.length === 0 ? (
        <p style={{ color: '#888', textAlign: 'center' }}>Nenhum jogador ainda. Seja o primeiro!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rankings.map((entry, i) => {
            const isMe = entry.id === myId;
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}`;
            return (
              <div key={entry.id} className={`rank-row ${isMe ? 'rank-me' : ''}`}>
                <span style={{ width: 36, fontWeight: 'bold', fontSize: '1.2rem' }}>{medal}</span>
                <span style={{ flex: 1 }}>{entry.displayName}</span>
                <span style={{ width: 80, textAlign: 'right', fontWeight: 'bold' }}>
                  {entry.xp} XP
                </span>
                <span className="badge" style={{ marginLeft: 8 }}>Nv.{entry.level}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
