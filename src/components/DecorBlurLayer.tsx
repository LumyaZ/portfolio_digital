"use client";

import {useEffect, useState, type ReactNode} from "react";
import {useDecorHidden} from "@/components/DecorVisibilityProvider";

type DecorBlurLayerProps = {
  children: ReactNode;
};

export default function DecorBlurLayer({children}: DecorBlurLayerProps) {
  const hide = useDecorHidden();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || hide) {
    return null;
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {children}
    </div>
  );
}
