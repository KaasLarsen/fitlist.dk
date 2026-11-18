# Rich Snippets & Schema på Fitlist

Strukturerede data (JSON-LD) bygges centralt i `src/lib/schema/guide-jsonld.ts` og injectes på guide-detaljesider. Live priser kommer fra Partner-Ads via `resolveGuideOffers`.

## Sidetype → schema

| Sidetype | Schema i `@graph` |
|----------|-------------------|
| Bedste-/budget-guides | Article, ItemList af Product (+ Offer/Review), FAQPage, BreadcrumbList |
| Modelguide (ét produkt) | Article, Product + Review (+ Offer), FAQPage, BreadcrumbList |
| Model-vs | Article, ItemList af Products + Review, FAQPage, BreadcrumbList |
| Guides med `howToSteps` | + HowTo |

## Redaktionelle greb (AI Overviews / featured snippets)

1. **Svar først (40–60 ord)** under hver H2 i `learningSections`: første afsnit skal svare direkte på overskriften uden intro-snak.
2. **HTML-tabeller** via `learningSections[].comparison` — aldrig data kun i billeder.
3. **Fordele/ulemper** via `pros` / `cons` på hvert `GuideProduct`.
4. **FAQ** i `faqs[]` — synlig på siden og i FAQPage JSON-LD.
5. **`updatedAt`** bumpes ved indholdsopdatering (Article `dateModified` + synlig “Opdateret”).

## Ratings (Product / Review)

- Felt: `GuideProduct.rating` (1.0–5.0, ét decimal) = Fitlists redaktionelle score.
- Synlig som “Fitlist-vurdering” i UI (`FitlistRating`) — skal matche JSON-LD.
- Schema: `Review` + `reviewRating` (ikke oppustet `AggregateRating.reviewCount`).

Skala: 5.0 exceptional · 4.5–4.9 stærk anbefaling · 4.0–4.4 solid med forbehold · 3.5–3.9 niche · &lt;3.5 undgå i anbefalinger.

## HowTo

Sæt `howToSteps: [{ name, text }, ...]` når guiden er en reel trin-for-trin plan (fx fase-byggeren). Prosa i `howToChoose` alene er ikke nok til HowTo-schema.

## Test

Efter deploy: indsæt URL i [Google Rich Results Test](https://search.google.com/test/rich-results). Lokalt: `npm test` (inkl. `guide-jsonld.test.ts`).
