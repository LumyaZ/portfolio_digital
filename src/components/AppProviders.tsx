"use client";

import type {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import DecorVisibilityProvider from "@/components/DecorVisibilityProvider";

type AppProvidersProps = {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
};

export default function AppProviders({children, locale, messages}: AppProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DecorVisibilityProvider>{children}</DecorVisibilityProvider>
    </NextIntlClientProvider>
  );
}
