import { useEffect, useState } from 'react';
import { getUpcomingMatches, bulkSubmitPredictions, getStoredUserId } from '../api';

interface Match {
  id: string;
  teamA: string;
  teamB: string;
  flagA: string | null;
  flagB: string | null;
  matchDate: string;
  phase: string;
}

interface PredictionEntry {
  scoreA: number;
  scoreB: number;
}

interface CardFeedback {
  status: 'success' | 'error';
  error?: string;
}

export default function Predictions() {
  const userId = getStoredUserId();
  const [matches, setMatches] = useState<Match[]>([]);
  const [predictions, setPredictions] = useState<Record<string, PredictionEntry>>({});
  const [feedback, setFeedback] = useState<Record<string, CardFeedback>>({});
  const [globalMessage, setGlobalMessage] = useState('');
  const [globalError, setGlobalError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [xpPopup, setXpPopup] = useState<number | null>(null);

  useEffect(() => { getUpcomingMatches().then(setMatches); }, []);

  function updateScore(matchId: string, field: 'scoreA' | 'scoreB', value: number) {
    setPredictions(prev => ({
      ...prev,
      [matchId]: {
        ...(prev[matchId] || { scoreA: 0, scoreB: 0 }),
        [field]: value,
      },
    }));
  }

  function getFilledPredictions(): Array<{ matchId: string; predictedScoreA: number; predictedScoreB: number }> {
    return Object.entries(predictions)
      .filter(([, p]) => p.scoreA !== undefined && p.scoreB !== undefined)
      .map(([matchId, p]) => ({
        matchId,
        predictedScoreA: p.scoreA,
        predictedScoreB: p.scoreB,
      }));
  }

  function hasPartialPrediction(matchId: string): boolean {
    const p = predictions[matchId];
    return !!(p && (p.scoreA !== undefined || p.scoreB !== undefined) && !(p.scoreA !== undefined && p.scoreB !== undefined));
  }

  async function handleBulkSubmit() {
    if (!userId) {
      setGlobalError('Registre-se primeiro!');
      return;
    }
    setGlobalError('');
    setGlobalMessage('');
    setFeedback({});
    setSubmitting(true);

    const filled = getFilledPredictions();
    if (filled.length === 0) {
      setSubmitting(false);
      return;
    }

    try {
      const results = await bulkSubmitPredictions(userId, filled);
      const newFeedback: Record<string, CardFeedback> = {};
      let successCount = 0;

      for (const r of results) {
        if (r.success) {
          newFeedback[r.matchId] = { status: 'success' };
          successCount++;
        } else {
          newFeedback[r.matchId] = { status: 'error', error: r.error };
        }
      }

      setFeedback(newFeedback);

      if (successCount > 0) {
        setGlobalMessage(`${successCount} palpite(s) registrado(s)! ⚽`);
        showXpPopup(10);
      } else {
        setGlobalError('Nenhum palpite foi registrado. Verifique os erros nos cards.');
      }
    } catch (err: any) {
      setGlobalError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function showXpPopup(amount: number) {
    setXpPopup(amount);
    setTimeout(() => setXpPopup(null), 2000);
  }

  function getCardClassName(matchId: string): string {
    const f = feedback[matchId];
    if (f) {
      return `match-card ${f.status}`;
    }
    if (hasPartialPrediction(matchId)) {
      return 'match-card incomplete';
    }
    return 'match-card';
  }

  const filledCount = getFilledPredictions().length;

  return (
    <div>
      {xpPopup && (
        <div className="xp-popup">+{xpPopup} XP</div>
      )}

      <div className="card">
        <h1>⚽ Palpites</h1>
        {!userId && (
          <p style={{ color: '#ff9800', textAlign: 'center' }}>
            Registre-se na página inicial antes de palpitar!
          </p>
        )}
        <p style={{ color: '#8b949e', textAlign: 'center', marginBottom: 16, fontSize: '0.9rem' }}>
          Preencha os placares nos cards abaixo e clique em Confirmar para enviar todos de uma vez.
        </p>

        {globalError && <p style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: 12 }}>{globalError}</p>}
        {globalMessage && <p style={{ color: '#00e676', textAlign: 'center', marginBottom: 12 }}>{globalMessage}</p>}

        {matches.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center' }}>Carregando partidas...</p>
        ) : (
          <div className="match-grid">
            {matches.map(m => {
              const cardFeedback = feedback[m.id];

              return (
                <div key={m.id} className={getCardClassName(m.id)}>
                  <div className="match-teams">
                    <div className="match-team">
                      {m.flagA && <img src={m.flagA} className="flag-img" alt="" />}
                      <span>{m.teamA}</span>
                    </div>
                    <span className="vs">VS</span>
                    <div className="match-team">
                      {m.flagB && <img src={m.flagB} className="flag-img" alt="" />}
                      <span>{m.teamB}</span>
                    </div>
                  </div>
                  <div className="match-info">
                    <span className="badge">{m.phase}</span>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>
                      {new Date(m.matchDate).toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="match-score-inputs">
                    <input
                      type="number"
                      min={0}
                      placeholder="0"
                      className="score-input score-input-sm"
                      value={predictions[m.id]?.scoreA ?? ''}
                      onChange={e => updateScore(m.id, 'scoreA', Number(e.target.value))}
                      disabled={submitting || !!cardFeedback}
                    />
                    <span className="vs-input">×</span>
                    <input
                      type="number"
                      min={0}
                      placeholder="0"
                      className="score-input score-input-sm"
                      value={predictions[m.id]?.scoreB ?? ''}
                      onChange={e => updateScore(m.id, 'scoreB', Number(e.target.value))}
                      disabled={submitting || !!cardFeedback}
                    />
                  </div>

                  {cardFeedback?.status === 'success' && (
                    <div className="card-feedback success">Palpite salvo!</div>
                  )}
                  {cardFeedback?.status === 'error' && (
                    <div className="card-feedback error">{cardFeedback.error}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="bulk-submit-area">
          <button
            className="btn btn-primary btn-bulk"
            disabled={filledCount === 0 || submitting}
            onClick={handleBulkSubmit}
          >
            {submitting ? 'Enviando...' : `Confirmar Palpites (${filledCount})`}
          </button>
        </div>
      </div>
    </div>
  );
}
