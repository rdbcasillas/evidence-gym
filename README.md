# Evidence Gym

A web app for training people to recognize weak evidence. Practice identifying common flaws in how evidence is presented and interpreted.

## The Four Evidence Weaknesses

| Category | Key Question | The Flaw |
|----------|--------------|----------|
| **Non-Discriminating** | "Would I see this if the claim were false?" | Evidence that confirms but doesn't distinguish between alternatives |
| **Filtered / Biased** | "What am I not seeing?" | Survivorship bias, selection bias, cherry-picked data |
| **Buried Baseline** | "How common is this anyway?" | Missing base rates, no comparison to what's normal |
| **Low Fidelity** | "How many people translated this?" | Distorted through multiple retellings, unreliable sources |

## How It Works

1. Choose a category to practice
2. Read a scenario with a claim and evidence
3. Judge whether the evidence is strong or flawed
4. See the explanation and learn why
5. Track your score and improve

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS
- Pinia (state management)
- Vue Router
- Vite

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check
```

## Project Structure

```
src/
├── components/       # UI components for each category flow
├── views/           # Page components (Home, Category, Play)
├── stores/          # Pinia store for game state
├── data/            # Card content for all categories
├── types/           # TypeScript type definitions
└── router.ts        # Route configuration
```

## License

MIT
