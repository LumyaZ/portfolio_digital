"use client";

import type {CSSProperties} from "react";
import {useCallback, useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import type {Passion, PassionId} from "@/data/passion";
import {PASSIONS} from "@/data/passion";

function toPairRows(passions: readonly Passion[]): {left: Passion; right: Passion}[] {
  if (passions.length % 2 !== 0) {
    throw new Error(`PASSIONS doit contenir un nombre pair d’éléments (reçu : ${passions.length}).`);
  }
  const rows: {left: Passion; right: Passion}[] = [];
  for (let i = 0; i < passions.length; i += 2) {
    rows.push({left: passions[i]!, right: passions[i + 1]!});
  }
  return rows;
}

const PAIR_ROWS = toPairRows(PASSIONS);

const ROW_OVERLAP =
  "max-sm:mt-5 sm:-mt-9 md:-mt-12 lg:-mt-[3.25rem]";

const ROW_BELOW_EXPANDED =
  "max-sm:mt-7 sm:mt-4 md:mt-5 lg:mt-6";

function stackGradientClass(depth: number, total: number) {
  if (total <= 1) return "bg-gradient-to-br from-[#0a5560] to-[#0F6B78] text-white";
  if (depth === 0) return "bg-gradient-to-br from-[#0a5560] to-[#0F6B78] text-white";
  if (depth === total - 1) {
    return "bg-gradient-to-br from-[#6eb8c8] to-[#d8eef3] text-zinc-800 shadow-md";
  }
  return "bg-gradient-to-br from-[#1a7d8c] to-[#42a5b8] text-white";
}

function PassionPairCard({
  passion,
  rowIndex,
  depth,
  t,
  side,
  isLastRow,
  expandedId,
  onToggleExpand
}: {
  passion: Passion;
  rowIndex: number;
  depth: number;
  t: ReturnType<typeof useTranslations<"about">>;
  side: "left" | "right";
  isLastRow: boolean;
  expandedId: PassionId | null;
  onToggleExpand: (id: PassionId) => void;
}) {
  const total = PAIR_ROWS.length;
  const grad = stackGradientClass(depth, total);
  const light = depth === total - 1 && total > 1;
  const expanded = expandedId === passion.id;

  const titleText = t(`passions.${passion.id}.title`);
  const ariaLabel = expanded
    ? t("collapsePassion", {title: titleText})
    : t("expandPassion", {title: titleText});

  return (
    <button
      type="button"
      aria-expanded={expanded}
      aria-label={ariaLabel}
      onClick={() => onToggleExpand(passion.id)}
      className={`about-stack-card flex min-h-0 w-full min-w-0 max-w-md touch-manipulation flex-col rounded-2xl border border-white/20 text-left shadow-lg transition-[box-shadow,transform] duration-300 ease-out sm:max-w-lg md:max-w-xl lg:min-w-0 lg:max-w-none lg:flex-1 lg:self-stretch focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78] focus-visible:ring-2 focus-visible:ring-white/40 ${
        expanded
          ? "relative z-70 max-sm:z-40 overflow-visible shadow-2xl ring-2 ring-white/35 ring-offset-2 ring-offset-transparent max-sm:ring-1 max-sm:ring-offset-0"
          : "overflow-hidden"
      } cursor-pointer hover:brightness-[1.03] active:scale-[0.99] h-full ${side === "left" ? "lg:mr-0.5" : "lg:ml-0.5"} ${grad}`}
      style={{"--pair-row": rowIndex} as CSSProperties}
    >
      <div className="flex min-h-0 flex-1 items-stretch justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-5 sm:py-5">
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3
            className={`text-base font-semibold leading-snug tracking-tight sm:text-lg ${
              light ? "text-[#0F6B78]" : "text-white"
            }`}
          >
            {titleText}
          </h3>
          <div
            className={`mt-2 overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              expanded ? "max-h-[min(70vh,28rem)]" : "max-h-21 sm:max-h-24"
            }`}
          >
            <p
              className={`wrap-break-word text-sm leading-relaxed sm:text-[0.9375rem] ${
                light ? "text-zinc-700" : "text-white/88"
              }`}
            >
              {t(`passions.${passion.id}.body`)}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center self-stretch">
          <div className="rounded-xl border border-black/5 bg-white p-2 shadow-md sm:p-2.5">
            <img
              src={passion.iconSrc}
              alt=""
              width={52}
              height={52}
              className="h-11 w-11 object-contain sm:h-13 sm:w-13"
              loading="lazy"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function AboutSection() {
  const t = useTranslations("about");
  const [expandedId, setExpandedId] = useState<PassionId | null>(null);

  const expandedRowIndex = useMemo(() => {
    if (!expandedId) return -1;
    return PAIR_ROWS.findIndex(
      (r) => r.left.id === expandedId || r.right.id === expandedId
    );
  }, [expandedId]);

  const onToggleExpand = useCallback((id: PassionId) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="about"
      className="relative scroll-mt-32 overflow-visible border-t border-zinc-200/80 py-14 sm:py-20"
      aria-labelledby="about-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#fafafa_0%,#ffffff_45%,#f4fafb_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#0F6B78]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(#0F6B78_0.8px,transparent_0.8px)] bg-size-[22px_22px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="about-heading"
            className="mt-1 text-3xl font-bold tracking-tight text-[#0F6B78] sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </h2>
        </header>

        <div className="relative mx-auto mt-12 max-w-6xl sm:mt-14 lg:mt-16 lg:max-w-7xl">
          <ul className="relative list-none">
            {PAIR_ROWS.map((row, rowIndex) => {
              const isLastRow = rowIndex === PAIR_ROWS.length - 1;
              const pushDownBelowExpanded =
                expandedId !== null &&
                expandedRowIndex >= 0 &&
                rowIndex === expandedRowIndex + 1;
              const rowMarginClass =
                rowIndex === 0
                  ? ""
                  : pushDownBelowExpanded
                    ? ROW_BELOW_EXPANDED
                    : ROW_OVERLAP;
              return (
                <li
                  key={`${row.left.id}-${row.right.id}`}
                  className={`relative pointer-events-none transition-[margin-top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:duration-0 ${rowMarginClass}`}
                  style={{zIndex: 10 + rowIndex * 10}}
                >
                  <div
                    className={
                      isLastRow
                        ? "pointer-events-auto mx-auto flex w-full max-w-2xl flex-col gap-3 sm:gap-5 sm:max-w-none lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-3"
                        : "pointer-events-auto mx-auto flex w-full max-w-2xl flex-col gap-3 sm:gap-5 sm:max-w-none lg:flex-row lg:items-stretch lg:justify-center lg:gap-3"
                    }
                  >
                    <PassionPairCard
                      passion={row.left}
                      rowIndex={rowIndex}
                      depth={rowIndex}
                      t={t}
                      side="left"
                      isLastRow={isLastRow}
                      expandedId={expandedId}
                      onToggleExpand={onToggleExpand}
                    />

                    <div
                      className="mx-auto h-px w-full max-w-40 shrink-0 rounded-full bg-linear-to-r from-transparent via-[#0F6B78]/35 to-transparent lg:hidden"
                      aria-hidden
                    />

                    <div
                      className="hidden w-px shrink-0 self-stretch rounded-full bg-linear-to-b from-transparent from-10% via-[#0F6B78]/45 via-1/2 to-transparent to-90% lg:mx-1 lg:block"
                      aria-hidden
                    />

                    <PassionPairCard
                      passion={row.right}
                      rowIndex={rowIndex}
                      depth={rowIndex}
                      t={t}
                      side="right"
                      isLastRow={isLastRow}
                      expandedId={expandedId}
                      onToggleExpand={onToggleExpand}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}