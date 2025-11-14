# AI 8D generátor – MVP (kroky 1–4)

Jednoduchý Next.js projekt připravený pro nasazení na Vercel. Tato verze
obsahuje:

- základní stránku s formulářem (textarea + tlačítko),
- jednoduchý frontend, který volá API endpoint,
- API route `/api/generate` vracející testovací (fake) data D2–D5.

Zatím není napojená skutečná AI – endpoint vždy vrací statický návrh, jen
s krátkým náhledem vstupního textu v D2.

## Spuštění lokálně (volitelné)

```bash
npm install
npm run dev
```

Aplikace poběží na http://localhost:3000
