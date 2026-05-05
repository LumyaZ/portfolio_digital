"use client";

import {useId} from "react";
import {useTranslations} from "next-intl";
import {SKILL_CATEGORIES, getSkillsForCategory} from "@/data/skill";

export default function TechSection() {
  const t = useTranslations("tech");
  const scopeId = useId();

  return (
    <section
      id="tech"
      className="relative scroll-mt-32 overflow-hidden border-t border-zinc-200/80 py-20 sm:py-28"
      aria-labelledby="tech-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#fafafa_0%,#ffffff_45%,#f4fafb_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(#0F6B78_0.8px,transparent_0.8px)] bg-size-[22px_22px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <h2
            id="tech-heading"
            className="mt-1 text-3xl font-bold tracking-tight text-[#0F6B78] sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </h2>
        </header>

        <div className="mx-auto mt-10 max-w-5xl space-y-8 sm:mt-12 sm:space-y-9">
          {SKILL_CATEGORIES.map((cat) => {
            const skills = getSkillsForCategory(cat);
            if (skills.length === 0) return null;

            const headingId = `${scopeId}-category-${cat.id}`;
            const descId = `${headingId}-desc`;

            return (
              <section
                key={cat.id}
                className="scroll-mt-28"
                aria-labelledby={headingId}
                aria-describedby={descId}
              >
                <h3
                  id={headingId}
                  className="text-lg font-semibold text-[#0F6B78] sm:text-xl"
                >
                  {t(`categories.${cat.id}.title`)}
                </h3>
                <p
                  id={descId}
                  className="mt-1 max-w-2xl text-sm text-zinc-600 sm:text-base"
                >
                  {t(`categories.${cat.id}.description`)}
                </p>
                <ul className="mt-4 flex flex-wrap gap-3 sm:gap-4">
                  {skills.map((skill) => (
                    <li
                      key={skill.id}
                      className="flex items-center gap-2.5 rounded-xl border border-zinc-200/90 bg-white px-3 py-2 shadow-sm sm:gap-3 sm:px-4 sm:py-2.5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-50 sm:h-10 sm:w-10">
                        <img
                          src={skill.iconSrc}
                          alt=""
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                          loading="lazy"
                          aria-hidden
                        />
                      </span>
                      <span className="text-sm font-medium text-zinc-800 sm:text-base">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}