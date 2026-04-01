import {getRequestConfig} from "next-intl/server";

const locales = ["fr", "en"] as const;

export default getRequestConfig(async ({requestLocale}) => {
  const locale = (await requestLocale) as (typeof locales)[number] | undefined;

  const safeLocale = locales.includes((locale ?? "fr") as any)
    ? (locale as (typeof locales)[number])
    : "fr";

  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default
  };
});