import { useEffect, useState } from 'react';
import { getUser, getUserPredictions, getUserAchievements, getStoredUserId } from '../api';

interface UserData {
  id: string;
  displayName: string;
  xp: number;
  level: number;
}

export default function Profile() {
  const userId = getStoredUserId();
  const [user, setUser] = useState<UserData | null>(null);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    if (userId) {
      getUser(userId).then(setUser);
      getUserPredictions(userId).then(setPredictions);
      getUserAchievements(userId).then(setAchievements);
    }
  }, [userId]);

  if (!user) return <p style={{ textAlign: 'center' }}>Carregando...</p>;

  const levelProgress = { percent: Math.min(100, ((user.xp % 100) / 100) * 100) };

  return (
    <div>
      <div className="card profile-header">
        <h1>{user.displayName}</h1>
        <div className="xp-display">
          <span className="xp-big">{user.xp}</span> <span className="xp-label">XP</span>
        </div>
        <div className="level-badge">Nível {user.level}</div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${levelProgress.percent}%` }} />
        </div>
      </div>

      <div className="card">
        <h2>🏅 Conquistas</h2>
        {achievements.length === 0 ? (
          <p style={{ color: '#888' }}>Nenhuma conquista ainda.</p>
        ) : (
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {achievements.map((ua: any) => (
              <div key={ua.id} className="badge-lg">{ua.achievement?.icon} {ua.achievement?.name}</div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h2>📋 Histórico de Palpites</h2>
        {predictions.length === 0 ? (
          <p style={{ color: '#888' }}>Nenhum palpite registrado.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th className="th">Partida</th>
                <th className="th">Palpite</th>
                <th className="th">Resultado</th>
                <th className="th">XP</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p: any) => (
                <tr key={p.id}>
                  <td className="td">
                    {p.match.flagA && <img src={p.match.flagA} className="flag-img" style={{ marginRight: 4 }} />}
                    {p.match.teamA} vs {p.match.teamB}
                    {p.match.flagB && <img src={p.match.flagB} className="flag-img" style={{ marginLeft: 4 }} />}
                  </td>
                  <td className="td">{p.predictedScoreA} - {p.predictedScoreB}</td>
                  <td className="td">
                    {p.match.scoreA != null ? `${p.match.scoreA} - ${p.match.scoreB}` : 'Pendente'}
                  </td>
                  <td className="td" style={{ color: '#00e676', fontWeight: 'bold' }}>
                    {p.xpEarned != null ? `+${p.xpEarned}` : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
