"use client";

import {useCallback, useEffect, useId, useState} from "react";
import {useTranslations} from "next-intl";

const STORY_TAB_IDS = ["bts", "ynov", "alternance"] as const;
type StoryTabId = (typeof STORY_TAB_IDS)[number];

const TEAL = "#0F6B78";
const AUTO_ADVANCE_MS = 20_000;

/** Aligné sur Tailwind `sm` (640px) : en dessous, les onglets sont souvent tronqués. */
const COMPACT_TAB_MQ = "(max-width: 639px)";

export default function StorySection() {
  const t = useTranslations("story");
  const baseId = useId();
  const [active, setActive] = useState<StoryTabId>("bts");
  const [compactTabTooltips, setCompactTabTooltips] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(COMPACT_TAB_MQ);
    const sync = () => setCompactTabTooltips(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((prev) => {
        const i = STORY_TAB_IDS.indexOf(prev);
        return STORY_TAB_IDS[(i + 1) % STORY_TAB_IDS.length];
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = STORY_TAB_IDS.indexOf(active);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActive(STORY_TAB_IDS[(i + 1) % STORY_TAB_IDS.length]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActive(STORY_TAB_IDS[(i - 1 + STORY_TAB_IDS.length) % STORY_TAB_IDS.length]);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(STORY_TAB_IDS[0]);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(STORY_TAB_IDS[STORY_TAB_IDS.length - 1]);
    }
  }, [active]);

  return (
    <section
      id="story"
      className="relative scroll-mt-32 overflow-hidden border-t border-zinc-200/80 py-20 sm:py-28"
      aria-labelledby="story-heading"
    >
      {/* Même fond que Formations : dégradé + taches + damier */}
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
        className="pointer-events-none absolute left-1/2 top-1/4 h-48 w-48 -translate-x-1/2 rounded-full bg-[#0F6B78]/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 top-1/2 h-56 w-56 rounded-full bg-[#0F6B78]/8 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-10 bottom-1/3 h-52 w-52 rounded-full bg-cyan-400/12 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-1/4 top-[15%] h-40 w-40 rounded-full bg-[#0F6B78]/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/3 bottom-12 h-44 w-44 rounded-full bg-[#0F6B78]/9 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(45deg,#0F6B7814_0%,#0F6B7814_10%,transparent_10%,transparent_50%,#0F6B7814_50%,#0F6B7814_60%,transparent_60%,transparent_100%)] [background-size:18px_18px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="story-heading"
            className="text-3xl font-bold tracking-tight text-[#0F6B78] sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </h2>
        </header>

        <div className="mt-14">
          <div
            role="tablist"
            aria-label={t("title")}
            className="flex flex-wrap items-end gap-0"
            onKeyDown={onKeyDown}
          >
            {STORY_TAB_IDS.map((id) => {
              const isActive = active === id;
              const tabId = `${baseId}-tab-${id}`;
              const panelId = `${baseId}-panel-${id}`;
              const label = t(`timeline.${id}.label`);

              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  title={compactTabTooltips ? label : undefined}
                  onClick={() => setActive(id)}
                  className={[
                    "relative min-w-0 text-center text-sm font-medium transition-[min-height,padding,color,background-color] duration-200 ease-out sm:text-base",
                    "rounded-t-lg border border-b-0 border-zinc-200/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78]",
                    isActive
                      ? "z-10 flex-[1.85] px-6 min-h-[3.25rem] bg-[#0F6B78] pt-5 pb-3 text-white shadow-sm sm:min-h-[3.75rem] sm:px-10 sm:pt-6 sm:pb-3.5"
                      : "flex-1 px-3 min-h-[2.25rem] bg-white py-2.5 text-zinc-900 hover:bg-zinc-50 sm:min-h-[2.5rem] sm:px-4 sm:py-3",
                  ].join(" ")}
                  style={isActive ? {backgroundColor: TEAL} : undefined}
                >
                  <span className="block truncate">{label}</span>
                  {isActive && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 top-full z-20 -translate-x-1/2 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            className="rounded-b-lg rounded-tr-lg border border-t-0 border-zinc-200/90 p-6 shadow-sm sm:p-10"
            style={{backgroundColor: TEAL}}
          >
            {STORY_TAB_IDS.map((id) => {
              const panelId = `${baseId}-panel-${id}`;
              const tabId = `${baseId}-tab-${id}`;
              const isActive = active === id;

              return (
                <div
                  key={id}
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={tabId}
                  hidden={!isActive}
                  className={isActive ? "animate-story-slot-in text-white" : "hidden"}
                >
                  {isActive && (
                    <>
                      <p className="text-sm font-medium text-white/85">{t(`timeline.${id}.period`)}</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                        {t(`detail.${id}.title`)}
                      </h3>
                      <p className="mt-4 rounded-xl border border-zinc-200/80 bg-white p-4 text-zinc-800 whitespace-pre-line text-base leading-relaxed shadow-sm sm:p-6 sm:text-lg">
                        {t(`detail.${id}.body`)}
                      </p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}