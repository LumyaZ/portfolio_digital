"use client";

import {useTranslations} from "next-intl";
import {SKILL_CATEGORIES, getSkillsForCategory} from "@/data/skill";

export default function TechSection() {
  const t = useTranslations("tech");

  return (
    <section
      id="tech"
      className="relative scroll-mt-24 border-t border-zinc-200/80 bg-[#fafafa] py-20 sm:py-28"
      aria-labelledby="tech-heading"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0F6B78]/90">
            {t("kicker")}
          </p>
          <h2
            id="tech-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-[#0F6B78] sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">
            {t("intro")}
          </p>
        </header>

        <div className="mx-auto mt-14 max-w-5xl space-y-12 sm:mt-16 sm:space-y-14">
          {SKILL_CATEGORIES.map((cat) => {
            const skills = getSkillsForCategory(cat);
            if (skills.length === 0) return null;

            return (
              <div key={cat.id}>
                <h3 className="text-lg font-semibold text-[#0F6B78] sm:text-xl">
                  {t(`categories.${cat.id}.title`)}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-zinc-600 sm:text-base">
                  {t(`categories.${cat.id}.description`)}
                </p>
                <ul
                  className="mt-5 flex flex-wrap gap-3 sm:gap-4"
                  aria-label={t(`categories.${cat.id}.title`)}
                >
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
                        />
                      </span>
                      <span className="text-sm font-medium text-zinc-800 sm:text-base">
                        {skill.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}