import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, storeUserId } from '../api';

export default function Register() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const user = await register(displayName);
      storeUserId(user.id);
      navigate('/palpites');
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="card">
      <h1 style={{ textAlign: 'center', fontSize: '2rem' }}>⚽ Copa do Mundo 2026</h1>
      <p style={{ textAlign: 'center', color: '#888', marginBottom: 24 }}>Entre com seu nome para começar a jogar!</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360, margin: '0 auto' }}>
        <input
          placeholder="Seu nome de jogador"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          required
          className="input"
          autoFocus
        />
        {error && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}
        <button type="submit" className="btn btn-primary">Entrar no Jogo</button>
      </form>
    </div>
  );
}
