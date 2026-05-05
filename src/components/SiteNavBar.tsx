"use client";

import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const navKeys = ["projects", "training", "tech", "story", "about"] as const;

const linkFocus =
  "rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78]";

export default function SiteNavBar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setOpen(false);
      queueMicrotask(() => menuButtonRef.current?.focus());
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => firstMobileLinkRef.current?.focus());
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#0F6B78]/40 bg-[#fafafa]/95 text-[#0F6B78] backdrop-blur supports-backdrop-filter:bg-[#fafafa]/80"
      aria-label={t("aria")}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <Link
          href={`/${locale}`}
          className={`min-w-0 truncate text-sm sm:text-base hover:opacity-90 ${linkFocus}`}
        >
          <span className="font-bold">{t("brandName")}</span>
          <span className="mx-2 opacity-90" aria-hidden>
            |
          </span>
          <span>{t("brandRole")}</span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <ul className="hidden flex-wrap items-center gap-x-2 gap-y-1 text-sm md:flex md:text-base">
            {navKeys.map((key, i) => (
              <li key={key} className="flex items-center gap-2">
                {i > 0 && (
                  <span aria-hidden className="opacity-70">
                    |
                  </span>
                )}
                <Link
                  href={`/${locale}#${key}`}
                  className={`font-normal hover:underline ${linkFocus}`}
                >
                  {t(`links.${key}`)}
                </Link>
              </li>
            ))}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            className={`order-2 md:order-1 inline-flex h-11 min-w-11 shrink-0 items-center justify-center rounded-md border border-[#0F6B78]/40 md:hidden ${linkFocus}`}
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

          <div className="order-1 md:order-2 shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {open && (
        <div id="nav-mobile" className="border-t border-[#0F6B78]/20 bg-[#fafafa] px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navKeys.map((key, index) => (
              <li key={key}>
                <Link
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={`/${locale}#${key}`}
                  className={`block rounded-md py-3 text-base font-medium hover:bg-black/5 ${linkFocus}`}
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