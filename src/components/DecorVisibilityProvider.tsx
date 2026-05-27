"use client";

import {createContext, useContext, useEffect, type ReactNode} from "react";
import {useShouldHideDecor} from "@/hooks/useShouldHideDecor";
import {COMPACT_VIEWPORT_MQ} from "@/lib/viewport";

const DecorVisibilityContext = createContext(false);

export function useDecorHidden() {
  return useContext(DecorVisibilityContext);
}

type DecorVisibilityProviderProps = {
  children: ReactNode;
};

export default function DecorVisibilityProvider({children}: DecorVisibilityProviderProps) {
  const hideDecor = useShouldHideDecor();

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_VIEWPORT_MQ);
    const syncCompact = () => {
      document.documentElement.toggleAttribute("data-compact-viewport", mq.matches);
    };
    syncCompact();
    mq.addEventListener("change", syncCompact);
    return () => mq.removeEventListener("change", syncCompact);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-hide-decor", hideDecor);
    return () => document.documentElement.removeAttribute("data-hide-decor");
  }, [hideDecor]);

  useEffect(() => {
    const overflow =
      document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    document.documentElement.toggleAttribute("data-h-overflow", overflow);
  }, [hideDecor]);

  return (
    <DecorVisibilityContext.Provider value={hideDecor}>{children}</DecorVisibilityContext.Provider>
  );
}
