"use client";

import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navKeys = ["projects", "training", "tech", "story", "about"] as const;

export default function SiteNavBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#0F6B78]/40 bg-[#fafafa]/95 text-[#0F6B78] backdrop-blur supports-[backdrop-filter]:bg-[#fafafa]/80"
      aria-label={t("aria")}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        {/* Marque à gauche */}
        <p className="min-w-0 truncate text-sm sm:text-base">
          <span className="font-bold">{t("brandName")}</span>
          <span className="mx-2">|</span>
          <span>{t("brandRole")}</span>
        </p>

        {/* Tout le reste à droite */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* Desktop nav */}
          <ul className="hidden flex-wrap items-center gap-x-2 gap-y-1 text-sm md:flex md:text-base">
            {navKeys.map((key, i) => (
              <li key={key} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="opacity-70">
                    |
                  </span>
                )}
                <Link href={`/${locale}#${key}`} className="font-normal hover:underline">
                  {t(`links.${key}`)}
                </Link>
              </li>
            ))}
          </ul>

          {/* Burger mobile (à droite en mobile) */}
          <button
            type="button"
            className="order-2 md:order-1 inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-md border border-[#0F6B78]/40 md:hidden"
            aria-expanded={open}
            aria-controls="nav-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="text-[#0F6B78]">
                <path
                  fill="currentColor"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="text-[#0F6B78]">
                <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            )}
          </button>

          {/* Langue (à gauche du burger en mobile) */}
          <div className="order-1 md:order-2 shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div id="nav-mobile" className="border-t border-[#0F6B78]/20 bg-[#fafafa] px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navKeys.map((key) => (
              <li key={key}>
                <Link
                  href={`/${locale}#${key}`}
                  className="block rounded-md py-3 text-base font-medium hover:bg-black/5"
                  onClick={() => setOpen(false)}
                >
                  {t(`links.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}