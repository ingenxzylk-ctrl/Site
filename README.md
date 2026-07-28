# Zylk Health

React frontend for Zylk Health — AI-powered scalp assessments and doctor-reviewed hair care plans.

## Stack

- React 19 + Vite
- Homepage lives in a single file: `src/homepage.jsx`

## Getting started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

## Project structure

```
src/
  homepage.jsx       # Full homepage (sections, data, icons, interactions)
  styles/home.css    # Homepage styles
  App.tsx            # Renders <HomePage />
  main.tsx
```
