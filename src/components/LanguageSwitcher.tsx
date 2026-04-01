"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "next/navigation";

const locales = ["fr", "en"] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(nextLocale: (typeof locales)[number]) {
    const nextPathname = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${nextLocale}`);
    router.push(nextPathname);
  }

  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      onClick={() => switchTo(otherLocale)}
      className="rounded-md border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
      aria-label={`Changer la langue en ${otherLocale.toUpperCase()}`}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}