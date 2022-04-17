# 🚀 Micro Frontend Architecture Demo

## 🛠️ Run

`npm start`

---

## 🐚 Shell app

- Source: `apps/main`
- Start script: `npm run serve:main`
- Port: `3000`
- Remotes: `pokemon, rick_and_morty, ui`

---

## 📡 Remotes

#### Pokemon

- Source: `apps/pokemon`
- Start script: `npm run serve:pokemon`
- Port: `3001`,
- Exposes: `Pokemon`
- Remotes: `ui`

#### Rick & Morty

- Source: `apps/rick_and_morty`
- Start script: `npm run serve:rick_and_morty`
- Port: `3002`,
- Exposes: `RickAndMorty`
- Remotes: `ui`

---

## 📚 Libraries

#### UI

- Source: `libs/ui`
- Start script: `npm run serve:ui`
- Port: `3003`
- Exposes: `GlobalStyles, Button, Table, Pagination, Spinner`
