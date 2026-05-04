"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {useEffect, useRef, useState} from "react";
import type {ProjectId} from "@/data/projects";
import {getProjectCoverPopup, PROJECT_COVER, PROJECT_IDS, PROJECT_WEB_URL} from "@/data/projects";

export default function ProjectCardsList() {
  const t = useTranslations("projects");
  const [openId, setOpenId] = useState<ProjectId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (openId) {
      if (!el.open) el.showModal();
    } else {
      el.close();
    }
  }, [openId]);

  function closeModal() {
    setOpenId(null);
  }

  const isDynatrust = openId === "dynatrust";
  const isMusculia = openId === "musculia";
  const isYtechUnion = openId === "ytechUnion";
  const isCraft2give = openId === "craft2give";
  const siteUrl = openId ? PROJECT_WEB_URL[openId] : null;
  const popupImage = openId ? getProjectCoverPopup(openId) : null;

  const musculiaPopupFrame =
    "isolate overflow-hidden rounded-xl border border-[#7c3aed] bg-[#a855f7] shadow-none";
  const ytechPopupFrame =
    "isolate overflow-hidden rounded-xl border border-zinc-700 bg-[#1A1A1A] shadow-none";

  /** Même hauteur de carte pour toutes les zones image des popups. */
  const popupImageBoxClass =
    "flex h-[120px] w-full items-center justify-center p-2.5 sm:h-[132px] sm:p-3 md:h-[144px]";
  const popupImageImgClass =
    "max-h-[76%] max-w-[86%] object-contain object-center sm:max-h-[74%] sm:max-w-[84%]";
  /** Musculia + YtechUnion : logos plus petits. */
  const popupImageImgSmallerClass =
    "max-h-[56%] max-w-[74%] object-contain object-center sm:max-h-[54%] sm:max-w-[72%] md:max-h-[52%]";
  const popupImageImgSmallerClassYtechUnion =
    "max-h-[48%] max-w-[68%] object-contain object-center sm:max-h-[46%] sm:max-w-[66%] md:max-h-[44%]";

  /** Craft2Give : bannière large, remplit la carte (object-cover, sans bandes blanches sur les côtés). */
  const popupImageBoxCraft2giveClass =
    "relative flex h-[120px] w-full items-center justify-center overflow-hidden p-0 sm:h-[132px] md:h-[144px]";

  return (
    <>
      <ul className="relative w-full list-none">
        {PROJECT_IDS.map((id: ProjectId, index) => {
          const reverse = index % 2 === 1;
          const isCardDynatrust = id === "dynatrust";
          const coverCard = PROJECT_COVER[id];
          const title = t(`items.${id}.title`);
          const hoverTitle = t(`items.${id}.hoverTitle`);

          const slideIn = reverse
            ? "-translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            : "translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100";

          const overlayGradient = reverse
            ? [
                "bg-[linear-gradient(to_bottom,rgb(18,18,18)_0%,rgb(18,18,18)_42%,rgb(10,10,10)_50%,rgb(3,3,3)_58%,rgb(3,3,3)_100%)]",
                "md:bg-[linear-gradient(to_right,rgb(3,3,3)_0%,rgb(3,3,3)_42%,rgb(10,10,10)_50%,rgb(18,18,18)_58%,rgb(18,18,18)_100%)]",
              ].join(" ")
            : [
                "bg-[linear-gradient(to_bottom,rgb(18,18,18)_0%,rgb(18,18,18)_42%,rgb(10,10,10)_50%,rgb(3,3,3)_58%,rgb(3,3,3)_100%)]",
                "md:bg-[linear-gradient(to_right,rgb(18,18,18)_0%,rgb(18,18,18)_42%,rgb(10,10,10)_50%,rgb(3,3,3)_58%,rgb(3,3,3)_100%)]",
              ].join(" ");

          return (
            <li key={id} className="border-0">
              {index > 0 && (
                <div className="py-3 sm:py-4 md:py-5" aria-hidden>
                  <div className="mx-auto h-px w-full max-w-[10rem] shrink-0 rounded-full bg-gradient-to-r from-transparent via-[#0F6B78]/35 to-transparent sm:max-w-xs md:max-w-sm lg:max-w-md" />
                </div>
              )}

              <button
                type="button"
                onClick={() => setOpenId(id)}
                className="group block w-full cursor-pointer border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0F6B78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafa]"
                aria-label={`${title} — ${t("openDetail")}`}
              >
                <div
                  className={[
                    "relative flex min-h-[min(520px,85svh)] flex-col overflow-hidden md:min-h-[50svh] md:flex-row",
                    reverse ? "md:flex-row-reverse" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "pointer-events-none absolute inset-0 z-[12] transition-opacity duration-300",
                      "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100",
                      overlayGradient,
                    ].join(" ")}
                    aria-hidden
                  />

                  <figure
                    className={[
                      "relative z-0 h-56 w-full shrink-0 overflow-hidden border-b border-zinc-200/80 md:h-auto md:min-h-[50svh] md:w-1/2 md:border-b-0",
                      isCardDynatrust ? "bg-[#5327A7]" : "bg-white",
                    ].join(" ")}
                  >
                    {coverCard ? (
                      <Image
                        src={coverCard}
                        alt=""
                        fill
                        className="object-contain object-center"
                        sizes="(min-width: 768px) 50vw, 100vw"
                        priority={index === 0}
                        aria-hidden
                      />
                    ) : (
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-[#0F6B78]/28 via-zinc-100 to-white"
                        aria-hidden
                      />
                    )}
                  </figure>

                  <div
                    className="pointer-events-none absolute inset-0 z-[22] flex items-center px-6 md:px-12"
                    aria-hidden
                  >
                    <p
                      className={[
                        "max-w-[min(90%,42rem)] text-2xl font-bold leading-tight text-white drop-shadow-sm transition duration-300 sm:text-3xl md:text-4xl",
                        reverse ? "mr-auto text-left" : "ml-auto text-right",
                        slideIn,
                      ].join(" ")}
                    >
                      {hoverTitle}
                    </p>
                  </div>

                  <div className="relative z-[10] flex w-full flex-col justify-center bg-white py-8 md:w-1/2 md:py-12">
                    <div className="px-6 transition-opacity duration-300 group-hover:opacity-30 group-focus-within:opacity-30 md:px-10 lg:px-14">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F6B78]">
                        {t(`items.${id}.badge`)}
                      </p>
                    </div>

                    <h3 className="px-6 text-2xl font-bold tracking-tight text-zinc-900 transition-opacity duration-300 group-hover:invisible group-hover:opacity-0 group-focus-within:invisible group-focus-within:opacity-0 md:px-10 md:text-3xl lg:px-14">
                      {title}
                    </h3>

                    <div className="mt-4 space-y-3 px-6 transition-opacity duration-300 group-hover:opacity-30 group-focus-within:opacity-30 md:px-10 lg:px-14">
                      <p className="max-w-xl text-base leading-relaxed text-zinc-600">
                        {t(`items.${id}.description`)}
                      </p>
                      <p className="text-sm text-zinc-500">
                        {t(`items.${id}.tags`)
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                      <p className="text-xs font-medium text-zinc-400">{t("v2Hint")}</p>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className="fixed left-1/2 top-1/2 z-[100] w-[min(100vw-1.5rem,42rem)] max-h-[min(92dvh,900px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-[#0F6B78]/25 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-black/50 sm:w-[min(100vw-2rem,56rem)]"
        onClose={closeModal}
        onCancel={(e) => {
          e.preventDefault();
          closeModal();
        }}
        aria-labelledby="project-modal-title"
      >
        {openId ? (
          <div className="relative flex max-h-[min(92dvh,900px)] flex-col">
            <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto">
              <div className="relative overflow-hidden px-5 pb-5 pt-6 sm:px-10 sm:pb-6 sm:pt-8 lg:px-14">
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#fafafa_0%,#ffffff_45%,#f4fafb_100%)]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -left-16 top-20 h-48 w-48 rounded-full bg-[#0F6B78]/12 blur-3xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-12 top-1/3 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.28] [background-image:radial-gradient(#0F6B78_0.8px,transparent_0.8px)] [background-size:22px_22px]"
                  aria-hidden
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4">
                    <h2
                      id="project-modal-title"
                      className="min-w-0 flex-1 text-2xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-3xl"
                    >
                      {t(`items.${openId}.title`)}
                    </h2>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="shrink-0 rounded-full border border-[#0F6B78]/30 bg-white/95 px-3 py-1.5 text-sm font-medium text-[#0F6B78] shadow-sm backdrop-blur hover:bg-[#f4fafb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78]"
                      aria-label={t("modalClose")}
                    >
                      {t("modalClose")}
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F6B78]">
                      {t(`items.${openId}.badge`)}
                    </p>
                    {siteUrl ? (
                      <a
                        href={siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[#0F6B78] underline decoration-[#0F6B78]/40 underline-offset-4 transition hover:decoration-[#0F6B78]"
                      >
                        {t("visitSite")}
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-5 flex justify-center sm:mt-6" aria-hidden>
                    <div className="mx-auto h-px w-full max-w-[10rem] shrink-0 rounded-full bg-gradient-to-r from-transparent via-[#0F6B78]/35 to-transparent sm:max-w-xs md:max-w-sm" />
                  </div>

                  {popupImage ? (
                    <div
                      className={`mt-5 sm:mt-6 ${
                        isDynatrust
                          ? "overflow-hidden rounded-xl border border-zinc-200/80 bg-[#5327A7] shadow-sm"
                          : isMusculia
                            ? musculiaPopupFrame
                            : isYtechUnion
                              ? ytechPopupFrame
                              : isCraft2give
                                ? "overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm"
                                : "overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm"
                      }`}
                    >
                      <div
                        className={`${
                          isCraft2give ? popupImageBoxCraft2giveClass : popupImageBoxClass
                        } ${
                          isMusculia
                            ? "bg-[#9333ea]"
                            : isYtechUnion
                              ? "bg-[#1A1A1A]"
                              : ""
                        }`}
                      >
                        {isCraft2give ? (
                          <Image
                            src={popupImage}
                            alt=""
                            fill
                            className="object-cover object-center"
                            sizes="(min-width: 640px) 36rem, 90vw"
                          />
                        ) : (
                          <Image
                            src={popupImage}
                            alt=""
                            width={1600}
                            height={900}
                            className={
                              isMusculia || isYtechUnion
                                ? isYtechUnion
                                  ? popupImageImgSmallerClassYtechUnion
                                  : popupImageImgSmallerClass
                                : popupImageImgClass
                            }
                            sizes="(min-width: 640px) 36rem, 90vw"
                          />
                        )}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                    {t(`items.${openId}.tags`)
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex-1 border-t border-zinc-200/80 bg-white px-5 pb-8 pt-5 sm:px-10 sm:pb-10 sm:pt-6 lg:px-14">
                <p className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-zinc-600 sm:text-lg">
                  {t(`items.${openId}.detailBody`)}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}