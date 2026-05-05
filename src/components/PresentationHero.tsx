"use client";

import {useTranslations} from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {SKILLS} from "@/data/skill";

const HERO_EXCLUDED_SKILL_IDS = new Set(["git", "uipath"]);

export default function PresentationHero() {
  const t = useTranslations("presentation");
  const heroSkills = SKILLS.filter((s) => !HERO_EXCLUDED_SKILL_IDS.has(s.id));

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#fafafa_0%,#ffffff_45%,#f4fafb_100%)]"
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
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(#0F6B78_0.8px,transparent_0.8px)] bg-size-[22px_22px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-10 sm:py-12 lg:py-16">
        <div className="grid items-start gap-10 sm:grid-cols-[6fr_4fr]">
          <div className="min-w-0 space-y-6 lg:space-y-8">
            <div className="animate-slide-in-left">
              <div className="flex justify-start">
                <LanguageSwitcher />
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: "0.33s"}}>
              <p className="text-sm font-medium tracking-[0.35em] text-zinc-500">{t("kicker")}</p>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: "0.66s"}}>
              <div className="space-y-1">
                <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-[#0F6B78] sm:text-6xl md:text-7xl">
                  {t("name")}
                </h1>
                <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#0F6B78] sm:text-4xl">
                  {t("role")}
                </h2>
              </div>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: "0.99s"}}>
              <p className="max-w-xl whitespace-pre-line text-base leading-7 text-zinc-700 sm:text-lg">
                {t("bio")}
              </p>
            </div>

            <div className="animate-slide-in-left" style={{animationDelay: "1.33s"}}>
              <a
                href="/THOMAS_CORNU_CV.pdf"
                download="THOMAS_CORNU_CV.pdf"
                className="inline-flex items-center justify-center rounded-md bg-[#0F6B78] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78]"
              >
                {t("downloadCv")}
              </a>
            </div>
          </div>

          <div className="order-last min-w-0">
            <div className="flex flex-col gap-4">
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {heroSkills.map((skill, index) => {
                  const rowMobile = Math.floor(index / 2);
                  const delay = 1.15 + rowMobile * 0.12;

                  return (
                    <li key={skill.id} className="hero-skill-item group" style={{animationDelay: `${delay}s`}}>
                      <div className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white px-2 py-3 text-center shadow-sm transition duration-300 ease-out will-change-transform hover:z-10 hover:scale-[1.045] hover:border-[#0F6B78]/45 hover:shadow-lg hover:shadow-zinc-400/40">
                        <img
                          src={skill.iconSrc}
                          alt={skill.name}
                          width={64}
                          height={64}
                          className="h-16 w-16 object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}