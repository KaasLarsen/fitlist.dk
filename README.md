# Fitlist.dk

Den ultimative hjælper til træningsmaskiner til hjemmet.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Deploy: Vercel (`main` → production)

## Udvikling

```bash
npm install
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

## Indhold

| Fil | Formål |
|-----|--------|
| `src/lib/categories.ts` | Maskinkategorier + intents (foldbar, billig, støj, plads) |
| `src/lib/guides.ts` | Guides (TOC-klar struktur: kriterier, produkter, specs, CTA) |
| `src/lib/affiliates.ts` | Kuraterede partner-URL’er til guide-CTA’er |
| `src/lib/feeds/` | Partner-Ads feed-sync → live tilbud på `/maskiner/[slug]` |

Cron: `vercel.json` → `/api/cron/revalidate-feeds` hver 6. time. Sæt `CRON_SECRET` i Vercel.

### Guide-skelet (kondition-inspireret)

1. Intro  
2. Produkt-TOC (når produkter findes)  
3. Valg-kriterier  
4. Rangerede modeller med fordele/ulemper + specs + affiliate-CTA  
5. Opsummering / hvordan vælger du  
6. Læringsafsnit + relaterede guides  

### Første guides

- `/guides/bedste-loebebaand-2026`
- `/guides/bedste-romaskine-2026`

Kuraterede produktanbefalinger i guides er separate fra live feed-tilbud.
