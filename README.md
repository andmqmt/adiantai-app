# PastoVivo — Frontend

Interface web em Vue 3 para rastreamento em tempo real de rebanho bovino. Exibe um mapa interativo com a posição e status de cada animal, atualizado via SignalR a cada 2 segundos.

## Stack

- Vue 3 + TypeScript + Composition API
- Pinia (state management)
- Vue Router
- Leaflet + OpenStreetMap (mapa interativo)
- @microsoft/signalr (WebSocket client)

---

## Rodar com Docker (recomendado)

O `docker-compose.yml` fica no repositório do back-end (`adiantai-core`).  
Ambos os serviços devem estar em pastas irmãs:

```
<pasta-pai>/
├── adiantai-core/   ← contém o docker-compose.yml
└── adiantai-app/    ← este repositório
```

```bash
git clone <url-adiantai-core> adiantai-core
git clone <url-adiantai-app>  adiantai-app
cd adiantai-core
docker compose up --build
```

Acesse: **http://localhost**

---

## Rodar localmente (desenvolvimento)

### Pré-requisitos

- Node.js 20+
- Back-end rodando em `http://localhost:5000` (ver `adiantai-core`)

```bash
npm install
npm run dev
```

Acesse: `http://localhost:5173`

### Variáveis de ambiente

| Variável | Descrição | Padrão dev |
|---|---|---|
| `VITE_API_URL` | URL base da API | `http://localhost:5000` |

Em produção (Docker), a variável é vazia e o Nginx faz proxy de `/api/` e `/hubs/` para o backend.

---

## Estrutura

```
src/
├── components/
│   ├── FarmMap.vue        # Mapa Leaflet com marcadores por status
│   ├── StatusPanel.vue    # Painel de contagem por comportamento
│   └── AnimalList.vue     # Lista lateral de animais
├── stores/
│   └── livestock.ts       # Pinia store: SignalR + farms + animals
├── services/
│   ├── api.ts             # Chamadas REST
│   └── signalr.ts         # Factory do HubConnection
├── types/
│   └── index.ts           # Interfaces Animal, Farm, AnimalStatus
└── views/
    └── DashboardView.vue  # Layout principal
```
