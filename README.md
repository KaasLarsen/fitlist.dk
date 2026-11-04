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
| `src/lib/categories.ts` | Maskinkategorier + Must-haves + intents |
| `src/lib/guides.ts` | Guides (TOC, kriterier, produkter, FAQ, CTA) |
| `src/lib/affiliates.ts` | Valgfri manuelle partner-URL’er (fallback) |
| `src/lib/feeds/` | Partner-Ads feed-sync → live tilbud på `/maskiner/[slug]` |

Cron: `vercel.json` → `/api/cron/revalidate-feeds` hver 6. time. Sæt `CRON_SECRET` i Vercel.

### Guide-skelet

1. Intro  
2. TOC (sektioner + produkter)  
3. Rangerede modeller med fordele/ulemper + specs + **live Se pris** via `feedProductId`  
4. Valg-kriterier  
5. Opsummering / hvordan vælger du  
6. Læringsafsnit + FAQ + relaterede tilbud/guides  

### Shop-CTA via feed

Sæt `GuideProduct.feedProductId` til `FeedProduct.id` (fx `HomeX.dk:3179`).  
Ved render slås produktet op i kataloget → live pris, billede og tracked URL.  
Mangler produktet i feedet, falder UI tilbage til kategorisiden `/maskiner/[slug]`.

### Aktuelle guides

- `/guides/gaabaand-til-kontoret-2026` (under-desk / kontor walking pads)
- `/guides/bedste-traeningsudstyr-til-seniorer-2026` (intent: siddecykel / skånsom motion)
- `/guides/hjemmetraening-for-begyndere-foerste-90-dage` (Must-haves / begynder)
- `/guides/bedste-vaegmonteret-kabeltaarn-2026` (intent: kabeltårn)
- `/guides/ultimative-udendoers-home-gym-2026`
- `/guides/bedste-gaabaand-2026` (intent: walking pad / gåbånd)
- `/guides/bedste-foldbare-kompakte-traeningsmaskiner-2026` (intent: foldbar / plads)
- `/guides/bedste-stoejsvage-traeningsmaskiner-lejlighed-2026`
- `/guides/ultimative-home-gym-budget-2026`
- `/guides/bedste-smartcykel-2026` (intent: smart / Zwift)
- `/guides/bedste-cykel-til-zwift-2026`
- `/guides/bedste-spinningcykel-2026` (intent: spinning)
- `/guides/bedste-airbike-2026` (intent: airbike)
- `/guides/bedste-loebebaand-2026`
- `/guides/bedste-romaskine-2026`
- `/guides/bedste-motionscykel-2026`
- `/guides/bedste-crosstrainer-2026`
- `/guides/bedste-styrkemaskiner-2026`
- `/guides/bedste-multistation-2026` (intent: multistation / home gym)
- `/guides/bedste-justerbar-traeningsbaenk-2026` (intent: træningsbænk)

Kuraterede produktanbefalinger i guides er separate fra “Relaterede tilbud” (top feed-hits i samme kategori).
