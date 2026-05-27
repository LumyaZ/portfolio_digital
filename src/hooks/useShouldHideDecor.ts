"use client";

import {useEffect, useState} from "react";
import {COMPACT_VIEWPORT_MQ} from "@/lib/viewport";

function hasHorizontalOverflow() {
  return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
}

export function useShouldHideDecor() {
  const [isCompact, setIsCompact] = useState(false);
  const [hideForOverflow, setHideForOverflow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_VIEWPORT_MQ);
    const sync = () => setIsCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const check = () => {
      if (window.matchMedia(COMPACT_VIEWPORT_MQ).matches) {
        setHideForOverflow(false);
        return;
      }
      if (hasHorizontalOverflow()) {
        setHideForOverflow(true);
      }
    };

    check();
    const ro = new ResizeObserver(() => requestAnimationFrame(check));
    ro.observe(document.documentElement);
    ro.observe(document.body);

    window.addEventListener("resize", check);
    const t1 = window.setTimeout(check, 100);
    const t2 = window.setTimeout(check, 600);
    const t3 = window.setTimeout(check, 1500);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (!hideForOverflow || isCompact) return;

    const onResize = () => {
      if (!hasHorizontalOverflow()) {
        setHideForOverflow(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hideForOverflow, isCompact]);

  /** Après masquage des blurs, re-mesurer : le débordement peut disparaître. */
  useEffect(() => {
    if (!hideForOverflow || isCompact) return;

    const id = window.requestAnimationFrame(() => {
      if (!hasHorizontalOverflow()) {
        setHideForOverflow(false);
      }
    });

    return () => window.cancelAnimationFrame(id);
  }, [hideForOverflow, isCompact]);

  return isCompact || hideForOverflow;
}
