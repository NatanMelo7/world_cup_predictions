## Context

Atualmente a página de palpites exibe dois blocos: um formulário com `<select>` + inputs de placar + botão "Enviar Palpite", e abaixo uma grade de cards visuais das próximas partidas (flags, times, fase, data). O usuário precisa selecionar uma partida no dropdown, digitar os placares, enviar, repetir para cada partida — um fluxo lento e desconectado da visualização dos cards.

## Goals / Non-Goals

**Goals:**
- Cada card de partida futura exibe dois inputs numéricos (placar time A e time B)
- Usuário preenche os palpites diretamente nos cards
- Um botão "Confirmar Palpites" envia todos os palpites preenchidos de uma vez
- Backend com endpoint bulk que aceita array de palpites
- Feedback visual por card após envio (sucesso/erro)

**Non-Goals:**
- Edição de palpites já confirmados (mantém o comportamento existente de upsert)
- Arrastar/soltar ou reordenação de cards
- Salvar rascunho automático dos palpites (preenchimento some ao recarregar a página)
- Extrair MatchCard como componente reutilizável separado (fica inline na página por simplicidade)
- Alterar o comportamento de locking de partidas já iniciadas

## Decisions

- **Bulk endpoint vs múltiplas chamadas:** Criar `POST /api/predictions/bulk` que aceita `{ userId, predictions: [{ matchId, predictedScoreA, predictedScoreB }] }`. Retorna array com resultado individual por partida (sucesso/erro). Evita N chamadas HTTP e permite tratamento de erro granular.
- **Estado dos inputs:** `useState` local com um mapa `{ [matchId]: { scoreA: number, scoreB: number } }`. Inicializa vazio; inputs são uncontrolled visualmente mas controlados via state.
- **Validação no frontend:** O botão "Confirmar" só habilita quando pelo menos um card tem ambos os campos preenchidos. Cards com apenas um campo preenchido recebem destaque visual de alerta.
- **Componente:** Manter tudo dentro de `Predictions.tsx` por enquanto — a extração para componente reutilizável é non-goal. Se a página crescer demais, pode ser refatorado depois.
- **CSS:** Expandir `.match-card` para layout vertical com `.match-score-inputs` abaixo das informações da partida. Inputs seguem o estilo `.score-input` já existente. Cards ficam maiores mas mantêm a identidade visual.
- **Remoção do formulário antigo:** O bloco `<form>` com `<select>` é removido. A seção "⚽ Palpites" vira um cabeçalho com instrução e o botão de confirmação.

## Risks / Trade-offs

- **Risco:** Cards podem ficar visualmente poluídos com muitos inputs. → **Mitigação:** Inputs são compactos (largura 50px), alinhados horizontalmente, escondidos para partidas já iniciadas.
- **Risco:** Usuário preencher vários palpites e recarregar a página acidentalmente. → **Mitigação:** Non-goal para esta iteração; pode-se adicionar `localStorage` draft futuramente.
- **Risco:** Erro em um palpite no bulk não deve impedir os outros de serem salvos. → **Mitigação:** Backend processa cada predição individualmente e retorna resultado por item; frontend mostra check verde ou alerta vermelho por card.
