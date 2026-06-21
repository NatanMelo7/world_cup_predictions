# Copa do Mundo 2026 - Plataforma de Palpites

Plataforma gamificada de palpites para a Copa do Mundo FIFA 2026. Registre-se, dê palpites nos placares das partidas, acumule XP, suba de nível, desbloqueie conquistas e acompanhe sua colocação no ranking global.

## Funcionalidades

- **Palpites inline nos cards** — preencha os placares diretamente nos cards das próximas partidas e envie todos de uma vez
- **Sistema de XP e níveis** — ganhe XP conforme seus palpites se aproximam do resultado real
- **Conquistas** — desbloqueie badges ao atingir marcos (primeiro palpite, sequência de acertos, etc.)
- **Ranking global** — compare sua pontuação com outros jogadores
- **Sincronia automática** — dados de times, grupos e partidas sincronizados com API externa
- **Tema escuro World Cup 2026** — visual escuro com cores oficiais da Copa (azul marinho, dourado, teal)

## Stack

| Backend | Frontend |
|---|---|
| Node.js + Express | React 18 |
| TypeScript | TypeScript |
| PostgreSQL + Prisma | Vite 5 |
| tsx (dev runtime) | React Router v6 |
| API externa: worldcup26.ir | CSS puro (dark theme) |

## Pré-requisitos

- **Node.js** >= 18
- **npm** >= 9
- **PostgreSQL** >= 14

## Como rodar

### 1. Clone o repositório

```bash
git clone git@github.com:NatanMelo7/world_cup_predictions.git
cd world_cup_predictions
```

### 2. Instale as dependências

```bash
npm install --workspaces
```

### 3. Configure o banco de dados

Crie um banco PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE \"copa-do-mundo\";"
psql -U postgres -c "CREATE USER copa WITH PASSWORD 'copa';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE \"copa-do-mundo\" TO copa;"
```

### 4. Configure o `.env`

Edite `server/.env` com sua string de conexão:

```env
DATABASE_URL="postgresql://copa:copa@localhost:5432/copa-do-mundo?schema=public"
PORT=4000
JWT_SECRET="seu-segredo-jwt"
```

### 5. Execute as migrations

```bash
cd server
npx prisma migrate dev --name init
cd ..
```

### 6. Inicie o servidor

```bash
npm run dev --workspace=server
```

O servidor roda em `http://localhost:4000`.

### 7. Inicie o cliente (outro terminal)

```bash
npm run dev --workspace=client
```

O cliente roda em `http://localhost:3000` e faz proxy das chamadas `/api` para o servidor.

## Estrutura do projeto

```
world_cup_predictions/
├── client/                  # Frontend React + Vite
│   ├── src/
│   │   ├── pages/           # Register, Predictions, Profile, Leaderboard
│   │   ├── api.ts           # Cliente HTTP
│   │   └── index.css        # Todos os estilos (dark theme)
│   └── public/
│       └── world_cup_logo.svg
├── server/                  # Backend Express
│   ├── prisma/
│   │   ├── schema.prisma    # Schema do banco
│   │   └── migrations/
│   └── src/
│       ├── routes/           # Endpoints REST
│       └── services/         # Lógica de negócio
└── openspec/                 # Planejamento e specs
```

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/users/register` | Criar conta (apenas nome) |
| `GET` | `/api/users/:id` | Perfil do usuário |
| `GET` | `/api/predictions/upcoming` | Partidas abertas para palpite |
| `POST` | `/api/predictions` | Enviar um palpite |
| `POST` | `/api/predictions/bulk` | Enviar múltiplos palpites |
| `GET` | `/api/predictions/user/:userId` | Histórico de palpites |
| `GET` | `/api/leaderboard/global` | Ranking global |
| `GET` | `/api/achievements/user/:userId` | Conquistas do usuário |
| `GET` | `/api/health` | Health check |
