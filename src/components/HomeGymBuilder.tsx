"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, type RefObject } from "react";
import { formatPriceDkk } from "@/lib/format-price";
import {
  BUDGETS,
  FOCUSES,
  SPACES,
  builderHref,
  resolveSetup,
  type BudgetId,
  type FocusId,
  type HomeGymOffer,
  type SpaceId,
} from "@/lib/home-gym";

type Selection = {
  space: SpaceId | null;
  focus: FocusId | null;
  budget: BudgetId | null;
};

type Props = {
  products: HomeGymOffer[];
  initial: Selection;
};

const STEPS = ["Plads", "Fokus", "Budget"] as const;

export function HomeGymBuilder({ products, initial }: Props) {
  const router = useRouter();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const statusId = useId();
  const selection = initial;
  const productsById = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products],
  );

  useEffect(() => {
    if (!interacted.current) return;
    headingRef.current?.focus();
  }, [selection.space, selection.focus, selection.budget]);

  function go(next: Selection) {
    interacted.current = true;
    router.push(builderHref(next), { scroll: true });
  }

  const step = !selection.space ? 0 : !selection.focus ? 1 : !selection.budget ? 2 : 3;
  const setup =
    selection.space && selection.focus && selection.budget
      ? resolveSetup(
          selection.space,
          selection.focus,
          selection.budget,
          productsById,
        )
      : null;

  const spaceLabel = SPACES.find((item) => item.id === selection.space)?.label;
  const focusLabel = FOCUSES.find((item) => item.id === selection.focus)?.label;
  const budgetLabel = BUDGETS.find((item) => item.id === selection.budget)?.label;

  return (
    <div>
      <ol className="flex flex-wrap gap-x-6 gap-y-2">
        {STEPS.map((label, index) => {
          const current = step === index;
          const done = step > index;
          return (
            <li key={label}>
              <button
                type="button"
                aria-current={current ? "step" : undefined}
                onClick={() => {
                  if (index === 0) {
                    go({ space: null, focus: null, budget: null });
                  } else if (index === 1 && selection.space) {
                    go({ space: selection.space, focus: null, budget: null });
                  } else if (index === 2 && selection.space && selection.focus) {
                    go({
                      space: selection.space,
                      focus: selection.focus,
                      budget: null,
                    });
                  }
                }}
                disabled={index > step}
                className={`font-display text-xs font-medium uppercase tracking-[0.16em] transition-colors disabled:cursor-default ${
                  current
                    ? "text-accent"
                    : done
                      ? "text-foreground hover:text-accent"
                      : "text-muted"
                }`}
              >
                0{index + 1} {label}
              </button>
            </li>
          );
        })}
      </ol>

      {step < 3 ? (
        <Step
          headingRef={headingRef}
          step={step}
          onChoose={(id) => {
            if (step === 0) {
              go({ space: id as SpaceId, focus: null, budget: null });
            } else if (step === 1 && selection.space) {
              go({
                space: selection.space,
                focus: id as FocusId,
                budget: null,
              });
            } else if (step === 2 && selection.space && selection.focus) {
              go({
                space: selection.space,
                focus: selection.focus,
                budget: id as BudgetId,
              });
            }
          }}
          onBack={
            step === 0
              ? null
              : () => {
                  if (step === 1) go({ space: null, focus: null, budget: null });
                  else if (selection.space) {
                    go({ space: selection.space, focus: null, budget: null });
                  }
                }
          }
        />
      ) : setup ? (
        <Result
          headingRef={headingRef}
          statusId={statusId}
          spaceLabel={spaceLabel ?? ""}
          focusLabel={focusLabel ?? ""}
          budgetLabel={budgetLabel ?? ""}
          setup={setup}
          onBack={() => {
            if (!selection.space || !selection.focus) return;
            go({
              space: selection.space,
              focus: selection.focus,
              budget: null,
            });
          }}
          onRestart={() => go({ space: null, focus: null, budget: null })}
        />
      ) : null}
    </div>
  );
}

function Step({
  headingRef,
  step,
  onChoose,
  onBack,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  step: number;
  onChoose: (id: string) => void;
  onBack: (() => void) | null;
}) {
  const question =
    step === 0
      ? {
          title: "Hvor meget plads har du?",
          options: SPACES,
        }
      : step === 1
        ? {
            title: "Hvad er dit primære fokus?",
            options: FOCUSES,
          }
        : {
            title: "Hvad er dit budget?",
            options: BUDGETS,
          };

  return (
    <div className="mt-10">
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="max-w-xl font-display text-3xl font-semibold uppercase tracking-wide text-foreground outline-none sm:text-4xl"
      >
        {question.title}
      </h2>
      <ul className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-5">
        {question.options.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              onClick={() => onChoose(option.id)}
              className="group flex h-full w-full flex-col gap-4 border border-border bg-surface px-5 py-8 text-left transition-colors hover:border-accent/40"
            >
              <p className="font-display text-xl font-medium uppercase tracking-wide text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                {option.label}
              </p>
              <p className="text-sm leading-relaxed text-muted">
                {option.description}
              </p>
            </button>
          </li>
        ))}
      </ul>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="mt-8 font-display text-xs font-medium uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-dim"
        >
          ← Tilbage
        </button>
      ) : null}
    </div>
  );
}

function Result({
  headingRef,
  statusId,
  spaceLabel,
  focusLabel,
  budgetLabel,
  setup,
  onBack,
  onRestart,
}: {
  headingRef: RefObject<HTMLHeadingElement | null>;
  statusId: string;
  spaceLabel: string;
  focusLabel: string;
  budgetLabel: string;
  setup: ReturnType<typeof resolveSetup>;
  onBack: () => void;
  onRestart: () => void;
}) {
  const ready = setup.slots.filter((slot) => slot.product);
  const missing = setup.slots.filter((slot) => !slot.product);

  return (
    <div className="mt-10">
      <p className="font-display text-xs font-medium uppercase tracking-[0.16em] text-muted">
        {spaceLabel} · {focusLabel} · {budgetLabel}
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-3 max-w-3xl font-display text-3xl font-semibold uppercase tracking-wide text-foreground outline-none sm:text-4xl"
      >
        {setup.title}
      </h2>
      <p className="mt-4 max-w-2xl text-muted">{setup.summary}</p>

      <ul className="mt-10 flex flex-col gap-6">
        {ready.map((slot) =>
          slot.product ? (
            <li key={slot.product.id}>
              <MachineCard
                role={slot.role}
                why={slot.why}
                product={slot.product}
              />
            </li>
          ) : null,
        )}
      </ul>

      {missing.length > 0 ? (
        <ul className="mt-6 flex flex-col gap-3">
          {missing.map((slot) => (
            <li key={slot.role}>
              <Link
                href={slot.categoryHref}
                className="flex flex-col gap-1 border border-border bg-surface px-5 py-4 transition-colors hover:border-accent/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="font-display text-sm uppercase tracking-[0.14em] text-foreground">
                    {slot.role}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    Mangler i partner-feedet lige nu.
                  </span>
                </span>
                <span className="font-display text-xs uppercase tracking-[0.14em] text-accent">
                  Se {slot.categoryName} →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <div
        id={statusId}
        className="mt-10 border border-border bg-surface px-5 py-6 sm:px-6"
      >
        {setup.total != null ? (
          <p className="font-display text-2xl font-semibold tabular-nums text-foreground">
            {setup.complete ? "Samlet ca. " : "Sum af de maskiner, vi fandt: "}
            {formatPriceDkk(setup.total)}
          </p>
        ) : (
          <p className="font-display text-lg uppercase tracking-wide text-foreground">
            Priserne vises hos partneren
          </p>
        )}
        {setup.outsideBand ? (
          <p className="mt-2 max-w-xl text-sm text-muted">
            Priserne er live og kan have rykket sig ud af det valgte budget.
          </p>
        ) : (
          <p className="mt-2 text-sm text-muted">
            Live priser og lager fra partnerne.
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={onBack}
          className="font-display text-xs font-medium uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-dim"
        >
          ← Skift budget
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="font-display text-xs font-medium uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
        >
          Start forfra
        </button>
      </div>
    </div>
  );
}

function MachineCard({
  role,
  why,
  product,
}: {
  role: string;
  why: string;
  product: HomeGymOffer;
}) {
  const hasDiscount =
    product.oldPrice != null &&
    product.price != null &&
    product.oldPrice > product.price;
  const partner = product.merchant || "partneren";

  return (
    <article className="flex flex-col gap-5 border border-border bg-surface p-5 sm:flex-row sm:items-stretch sm:gap-6 sm:p-6">
      <div className="relative h-44 w-full shrink-0 overflow-hidden border border-border bg-background sm:h-40 sm:w-48">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 192px"
            className="object-contain p-3"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-3 text-center font-display text-xs uppercase tracking-[0.14em] text-muted">
            Intet billede
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <p className="font-display text-xs uppercase tracking-[0.16em] text-accent">
          {role}
          <span className={product.inStock ? "text-foreground" : "text-muted"}>
            {" "}
            · {product.inStock ? "På lager" : "Ikke på lager"}
          </span>
        </p>
        <h3 className="mt-2 font-display text-xl font-medium uppercase tracking-wide text-foreground sm:text-2xl">
          {product.title}
        </h3>
        <p className="mt-2 text-sm text-muted">{product.merchant}</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/80">
          {why}
        </p>
        <div className="mt-5 flex flex-col gap-4 sm:mt-auto sm:flex-row sm:items-end sm:justify-between">
          <div>
            {hasDiscount ? (
              <p className="text-xs text-muted line-through">
                {formatPriceDkk(product.oldPrice)}
              </p>
            ) : null}
            <p className="font-display text-2xl font-semibold tabular-nums text-foreground">
              {formatPriceDkk(product.price)}
            </p>
          </div>
          {product.url ? (
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex w-full items-center justify-center bg-accent px-5 py-4 text-center font-display text-sm font-semibold uppercase leading-snug tracking-[0.08em] text-accent-fg transition-colors hover:bg-accent-dim sm:w-auto sm:max-w-sm"
            >
              Se specifikationer og lagerstatus hos {partner} →
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
