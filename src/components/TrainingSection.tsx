"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import type {TrainingId} from "@/data/training";
import {TRAINING_IDS} from "@/data/training";
import {SKILLS} from "@/data/skill";

function splitList(raw: string, delimiter: string) {
  return raw
    .split(delimiter)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalizeTag(raw: string) {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function useInViewDisappear<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduce) {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return {ref, inView};
}

function buildSkillIconMap() {
  return new Map<string, string>(
    SKILLS.flatMap((s) => {
      const keys = new Set<string>([normalizeTag(s.name), normalizeTag(s.id)]);

      if (s.id === "nodejs") keys.add(normalizeTag("node"));
      if (s.id === "nextjs") keys.add(normalizeTag("next"));
      if (s.id === "postgresql") keys.add(normalizeTag("postgres"));
      if (s.id === "typescript") keys.add(normalizeTag("ts"));
      if (s.id === "html5") keys.add(normalizeTag("html"));
      if (s.id === "rest") keys.add(normalizeTag("rest api"));
      if (s.id === "mysql") keys.add(normalizeTag("sql"));
      if (s.id === "uipath") keys.add(normalizeTag("ui path"));

      return [...keys].map((k) => [k, s.iconSrc] as const);
    })
  );
}

type TrainingCardProps = {
  id: TrainingId;
  index: number;
  t: ReturnType<typeof useTranslations<"training">>;
  skillIconByKey: Map<string, string>;
};

function TrainingCard({id, index, t, skillIconByKey}: TrainingCardProps) {
  const alignLeft = index % 2 === 0;
  const metaOnRight = index === 1;

  const tags = splitList(t(`items.${id}.tags`), ",");
  const bullets = splitList(t(`items.${id}.bullets`), "|");

  const {ref, inView} = useInViewDisappear<HTMLLIElement>({
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  });

  function iconForTag(tag: string): string | undefined {
    const normalized = normalizeTag(tag);

    const direct = skillIconByKey.get(normalized);
    if (direct) return direct;

    // Tags combinés (ex: "HTML/CSS", "PHP (POO)")
    if (normalized.includes("html")) {
      return (
        skillIconByKey.get(normalizeTag("html")) ??
        skillIconByKey.get(normalizeTag("html5"))
      );
    }
    if (normalized.includes("php")) return skillIconByKey.get(normalizeTag("php"));
    if (normalized.includes("git")) return skillIconByKey.get(normalizeTag("git"));
    if (normalized.includes("uipath") || normalized.includes("ui path"))
      return skillIconByKey.get(normalizeTag("uipath"));

    return undefined;
  }

  // Slide horizontal + plus long
  const hiddenTranslate = alignLeft ? "-translate-x-10" : "translate-x-10";

  return (
    <li
      ref={ref}
      className={[
        "w-full max-w-[min(100%,48rem)] sm:max-w-[min(100%,54rem)] md:max-w-[min(100%,60rem)] lg:max-w-[min(100%,64rem)]",
        alignLeft
          ? "self-start pl-0 pr-4 sm:pr-6 md:pr-10"
          : "self-end pr-0 pl-4 sm:pl-6 md:pl-10",
        "transition-[transform,opacity] duration-[2200ms] ease-out will-change-transform",
        inView ? "translate-x-0 opacity-100" : `${hiddenTranslate} opacity-0`,
      ].join(" ")}
    >
      <article
        className={[
          "flex min-h-[min(320px,46svh)] flex-col border border-[#0F6B78]/20 bg-gradient-to-b from-white to-[#f4fafb] shadow-sm transition-shadow duration-300 md:min-h-[min(320px,42svh)] md:flex-row md:items-stretch",
          "hover:border-[#0F6B78]/35 hover:shadow-lg hover:shadow-[#0F6B78]/10",
          metaOnRight ? "md:flex-row-reverse" : "",
          alignLeft
            ? "rounded-l-none rounded-r-[1.75rem] border-l-0 sm:rounded-r-[2rem]"
            : "rounded-r-none rounded-l-[1.75rem] border-r-0 sm:rounded-l-[2rem]",
        ].join(" ")}
      >
        <div
          className={[
            "relative flex shrink-0 flex-col justify-between gap-4 border-b border-[#0F6B78]/35 px-4 py-6 sm:px-6 sm:py-8 md:w-[min(28%,12.5rem)] md:border-b-0 md:pb-8 md:pt-8",
            // Trait vertical interne (80% hauteur)
            "md:after:content-[''] md:after:absolute md:after:top-1/2 md:after:-translate-y-1/2 md:after:h-[80%] md:after:w-[2px] md:after:bg-[#0F6B78]/35",
            metaOnRight ? "md:after:left-0 md:pl-10 md:pr-6" : "md:after:right-0 md:pl-6 md:pr-10",
          ].join(" ")}
        >
          <div className="space-y-1">
            <p className="text-lg font-bold tabular-nums text-[#0F6B78] sm:text-xl">
              {t(`items.${id}.dateRange`)}
            </p>
            <p className="text-base font-medium text-[#0F6B78]/85 sm:text-lg">
              {t(`items.${id}.duration`)}
            </p>
          </div>
          <p className="whitespace-pre-line text-base font-bold leading-snug text-[#0F6B78] sm:text-lg">
            {t(`items.${id}.location`)}
          </p>
        </div>

        <div
          className={[
            "flex min-w-0 flex-1 flex-col gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 md:py-8",
            metaOnRight ? "md:pl-8 md:pr-6" : "md:pr-8",
          ].join(" ")}
        >
          <h3 className="text-lg leading-snug text-zinc-900 sm:text-xl md:text-2xl">
            <span className="font-bold">{t(`items.${id}.degree`)}</span>
            <span className="font-normal"> - {t(`items.${id}.program`)}</span>
          </h3>

          <ul className="flex list-none flex-wrap gap-2.5">
            {tags.map((tag) => {
              const iconSrc = iconForTag(tag);

              return (
                <li
                  key={tag}
                  className="flex items-center gap-2 rounded-lg border border-zinc-200/90 bg-zinc-100 px-3.5 py-1.5 text-sm font-medium text-zinc-800 transition-colors duration-200 hover:border-[#0F6B78]/35 hover:bg-[#0F6B78]/10 hover:text-[#0F6B78] sm:text-base"
                >
                  {iconSrc && (
                    <img
                      src={iconSrc}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                      loading="lazy"
                      aria-hidden
                    />
                  )}
                  <span>{tag}</span>
                </li>
              );
            })}
          </ul>

          <ul className="list-disc space-y-2.5 pl-5 text-base leading-relaxed text-zinc-800 marker:text-zinc-400 sm:text-lg">
            {bullets.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </article>
    </li>
  );
}

export default function TrainingSection() {
  const t = useTranslations("training");

  const skillIconByKey = useMemo(() => buildSkillIconMap(), []);

  return (
    <section
      id="training"
      className="relative scroll-mt-24 overflow-hidden border-t border-zinc-200/90 py-16 sm:py-24"
      aria-labelledby="training-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#fafafa_0%,#ffffff_55%,#f4fafb_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-32 h-64 w-64 rounded-full bg-[#0F6B78]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(45deg,#0F6B7814_0%,#0F6B7814_10%,transparent_10%,transparent_50%,#0F6B7814_50%,#0F6B7814_60%,transparent_60%,transparent_100%)] [background-size:18px_18px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mx-auto max-w-3xl px-2 text-center sm:px-0">
          <h2
            id="training-heading"
            className="text-3xl font-bold tracking-tight text-[#0F6B78] sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </h2>
          {t.has("intro") && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              {t("intro")}
            </p>
          )}
        </header>
      </div>

      <ul className="relative mt-12 flex w-full list-none flex-col gap-5 sm:mt-16 sm:gap-6 md:gap-8">
        {TRAINING_IDS.map((id, index) => (
          <TrainingCard
            key={id}
            id={id}
            index={index}
            t={t}
            skillIconByKey={skillIconByKey}
          />
        ))}
      </ul>
    </section>
  );
}