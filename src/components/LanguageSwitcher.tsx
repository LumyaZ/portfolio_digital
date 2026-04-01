"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "next/navigation";

const locales = ["fr", "en"] as const;
type Locale = (typeof locales)[number];

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  function goTo(nextLocale: Locale) {
    if (nextLocale === locale) return;
    const nextPathname = pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${nextLocale}`);
    router.push(nextPathname);
  }

  return (
    <div className="inline-flex items-center rounded-md bg-zinc-100 p-1 text-sm">
      {locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => goTo(l)}
            aria-current={active ? "true" : undefined}
            className={[
              "px-3 py-1 rounded",
              active ? "bg-[#0F6B78] text-white" : "text-[#0F6B78] hover:bg-black/5"
            ].join(" ")}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}