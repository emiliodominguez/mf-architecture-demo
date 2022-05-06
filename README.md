# 🚀 Micro Frontend Architecture Demo

---

# Table of contents

- [🛠️ Run](#run)
- [🐚 Shell app](#shell-app)
- [📡 Remotes](#remotes)
- [📚 Contexts](#contexts)
- [📚 Libraries](#libraries)

---

## Run

`npm start`

---

## Shell app

- Source: `apps/main`
- Start script: `npm run serve:main`
- Port: `3000`
- Remotes: `pokemon, rick_and_morty, chuck_norris, ui`

---

## Remotes

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

## Contexts

#### Chuck Norris

- Source: `contexts/chuck_norris`
- Start script: `npm run serve:chuck_norris`
- Port: `3003`
- Exposes: `ChuckNorrisContextProvider, useChuckNorris`

---

## Libraries

#### UI

- Source: `libs/ui`
- Start script: `npm run serve:ui`
- Port: `3004`
- Exposes: `GlobalStyles, Button, Table, Pagination, Spinner`
