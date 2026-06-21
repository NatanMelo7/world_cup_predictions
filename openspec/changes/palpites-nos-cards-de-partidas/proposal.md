## Why

O fluxo atual de palpites exige que o usuário selecione uma partida em um `<select>`, insira os placares em campos separados e envie uma por vez — um processo repetitivo e desconectado da visualização dos cards de partidas. Colocar os palpites diretamente nos cards de próximas partidas, com envio em lote, torna a experiência mais intuitiva, rápida e satisfatória.

## What Changes

- Adicionar campos de placar (score A e score B) diretamente em cada card de partida futura na grade de próximas partidas
- Substituir o formulário atual de palpite único (select + inputs) pelo preenchimento inline nos cards
- Adicionar botão "Confirmar Palpites" que envia todos os palpites preenchidos de uma vez
- **BREAKING**: Remover o formulário de palpite único por select; a página de palpites passa a usar exclusivamente os cards com inputs inline

## Capabilities

### New Capabilities
- `inline-match-predictions`: Campos de placar embutidos nos cards de partidas, permitindo preenchimento direto na grade de próximas partidas
- `bulk-prediction-submission`: Envio em lote de múltiplos palpites com um único clique, com feedback visual de sucesso/erro por partida

### Modified Capabilities
- `prediction-engine`: A submissão de palpites passa a suportar envio em lote (múltiplas partidas em uma única requisição)
- `gamified-ui`: A página de palpites é redesenhada — o formulário de select é removido e substituído por inputs inline nos cards

## Impact

- Frontend: refatoração significativa da página `Predictions.tsx`, novo endpoint `bulkSubmitPredictions` no `api.ts`
- Backend: novo endpoint `POST /api/predictions/bulk` para aceitar múltiplos palpites em uma única chamada
- CSS: ajustes nos estilos de `.match-card` para acomodar inputs de placar e botão de confirmação
- Nenhuma alteração no schema do banco de dados
