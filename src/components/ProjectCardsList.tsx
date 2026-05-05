"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {useEffect, useMemo, useRef, useState} from "react";
import type {ProjectId} from "@/data/projects";
import {getProjectCoverPopup, PROJECT_COVER, PROJECT_GALLERY, PROJECT_IDS, PROJECT_WEB_URL} from "@/data/projects";

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
    "flex h-[104px] w-full items-center justify-center p-2 sm:h-[112px] sm:p-2.5 md:h-[124px]";

  const popupImageImgClass =
    "max-h-[76%] max-w-[86%] object-contain object-center sm:max-h-[74%] sm:max-w-[84%]";
  /** Musculia + YtechUnion : logos plus petits. */
  const popupImageImgSmallerClass =
    "max-h-[56%] max-w-[74%] object-contain object-center sm:max-h-[54%] sm:max-w-[72%] md:max-h-[52%]";
  const popupImageImgSmallerClassYtechUnion =
    "max-h-[48%] max-w-[68%] object-contain object-center sm:max-h-[46%] sm:max-w-[66%] md:max-h-[44%]";

  /** Craft2Give : bannière large, remplit la carte (object-cover). */
  const popupImageBoxCraft2giveClass =
    "relative flex h-[104px] w-full items-center justify-center overflow-hidden p-0 sm:h-[112px] md:h-[124px]";

  const musculiaGallery = useMemo(() => PROJECT_GALLERY.musculia ?? [], []);
  const [musculiaIdx, setMusculiaIdx] = useState(0);
  const [isMusculiaLightboxOpen, setIsMusculiaLightboxOpen] = useState(false);

  useEffect(() => {
    if (openId !== "musculia") {
      setMusculiaIdx(0);
      setIsMusculiaLightboxOpen(false);
    }
  }, [openId]);

  return (
    <>
      <ul className="relative mx-auto w-full max-w-7xl list-none px-4 pt-6 pb-6 sm:px-6 sm:pt-8 sm:pb-8 lg:px-8 lg:pt-10 lg:pb-10">
        {PROJECT_IDS.map((id: ProjectId, index) => {
          const reverse = index % 2 === 1;
          const isCardDynatrust = id === "dynatrust";
          const coverCard = PROJECT_COVER[id];
          const title = t(`items.${id}.title`);

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
                className="group block w-full cursor-pointer rounded-2xl border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#0F6B78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafa]"
                aria-label={`${title} — ${t("openDetail")}`}
              >
                <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-md ring-1 ring-zinc-950/[0.04] transition-transform duration-200 ease-out hover:scale-[1.01] hover:shadow-xl active:scale-[0.995]">
                  <div
                    className={[
                      "relative flex min-h-[260px] flex-col overflow-hidden sm:min-h-[300px] md:min-h-[260px] lg:min-h-[300px] md:flex-row",
                      reverse ? "md:flex-row-reverse" : "",
                    ].join(" ")}
                  >
                    <figure
                      className={[
                        "relative z-0 h-36 w-full shrink-0 overflow-hidden border-b border-zinc-200/80 sm:h-44 md:h-auto md:min-h-[260px] md:w-1/2 md:border-b-0 lg:min-h-[300px]",
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

                    <div className="relative z-[10] flex w-full flex-col justify-center bg-white py-4 sm:py-5 md:w-1/2 md:py-6 lg:py-8">
                      <div className="px-6 md:px-10 lg:px-14">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F6B78]">
                          {t(`items.${id}.badge`)}
                        </p>
                      </div>

                      <h3 className="px-6 text-2xl font-bold tracking-tight text-zinc-900 md:px-10 md:text-3xl lg:px-14">
                        {title}
                      </h3>

                      <div className="mt-4 space-y-3 px-6 md:px-10 lg:px-14">
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
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-[100] m-0 h-screen w-screen max-h-none max-w-none border-0 bg-transparent p-3 backdrop:bg-black/50 sm:p-4"
        onClose={closeModal}
        onCancel={(e) => {
          e.preventDefault();
          closeModal();
        }}
        aria-labelledby="project-modal-title"
      >
        {openId ? (
          <div className="relative mx-auto my-auto flex w-full max-w-[42rem] max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-[1.25rem] border border-[#0F6B78]/25 bg-white text-zinc-900 shadow-2xl sm:max-w-[56rem] sm:max-h-[calc(100dvh-2rem)]">
            <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
              <div className="relative shrink-0 overflow-hidden px-5 pb-3 pt-4 sm:px-8 sm:pb-4 sm:pt-5 lg:px-10">
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
                      className="min-w-0 flex-1 text-xl font-bold leading-snug tracking-tight text-zinc-900 sm:text-2xl"
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

                  <div className="mt-2 flex w-full flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
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

                  {popupImage ? (
                    <div
                      className={`mt-3 sm:mt-4 ${
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

                  <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4">
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

              <div className="relative z-20 min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-zinc-200/80 bg-white px-5 pb-8 pt-5 sm:px-10 sm:pb-10 sm:pt-6 lg:px-14">
                <p className="max-w-3xl whitespace-pre-line text-[15px] leading-6 text-zinc-600 sm:text-base">
                  {t(`items.${openId}.detailBody`)}
                </p>

                {openId === "musculia" && musculiaGallery.length > 0 ? (
                  <div className="mt-4">
                    {/* Miniatures (très petites) */}
                    <div className="flex flex-wrap gap-2">
                      {musculiaGallery.map((src, idx) => {
                        const isActive = idx === musculiaIdx;

                        return (
                          <button
                            key={src}
                            type="button"
                            onClick={() => {
                              setMusculiaIdx(idx);
                              setIsMusculiaLightboxOpen(true);
                            }}
                            className={[
                              "group relative overflow-hidden rounded-lg border bg-white shadow-sm transition",
                              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78]",
                              isActive
                                ? "border-[#0F6B78]/50 ring-2 ring-[#0F6B78]/20"
                                : "border-zinc-200 hover:border-[#0F6B78]/35",
                            ].join(" ")}
                            aria-label={`Ouvrir l'image ${idx + 1}`}
                          >
                            <div className="relative h-12 w-16 sm:h-14 sm:w-20">
                              <Image
                                src={src}
                                alt=""
                                fill
                                className="object-cover object-center transition-transform duration-200 group-hover:scale-[1.03]"
                                sizes="80px"
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                      <span>
                        {musculiaIdx + 1} / {musculiaGallery.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsMusculiaLightboxOpen(true)}
                        className="rounded-full border border-zinc-200 bg-white px-3 py-1 font-semibold text-[#0F6B78] shadow-sm transition hover:bg-[#f4fafb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78]"
                      >
                        Agrandir
                      </button>
                    </div>

                    {/* Lightbox / viewer grand format */}
                    {isMusculiaLightboxOpen ? (
                      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6">
                        <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl">
                          {/* Header lightbox */}
                          <div className="flex items-center justify-between gap-3 border-b border-zinc-200/80 bg-white px-4 py-3 sm:px-6">
                            <div className="min-w-0">
                              <p className="text-sm font-bold tracking-[0.18em] text-[#0F6B78]">MUSCULIA</p>
                              <p className="text-xs text-zinc-500">
                                {musculiaIdx + 1} / {musculiaGallery.length}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => setIsMusculiaLightboxOpen(false)}
                              className="shrink-0 rounded-full border border-[#0F6B78]/30 bg-white px-3 py-1.5 text-sm font-semibold text-[#0F6B78] shadow-sm transition hover:bg-[#f4fafb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78]"
                              aria-label="Fermer la galerie"
                            >
                              Fermer
                            </button>
                          </div>

                          {/* Viewer */}
                          <div className="relative bg-zinc-950">
                            <div className="relative mx-auto h-[min(52dvh,420px)] w-full max-w-5xl">
                              <Image
                                src={musculiaGallery[musculiaIdx]}
                                alt=""
                                fill
                                className="object-contain object-center"
                                sizes="(min-width: 1024px) 64rem, 95vw"
                                priority
                              />
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setMusculiaIdx((i) => (i - 1 + musculiaGallery.length) % musculiaGallery.length)
                              }
                              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/90 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-lg backdrop-blur hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78] sm:left-4"
                              aria-label="Image précédente"
                            >
                              ←
                            </button>

                            <button
                              type="button"
                              onClick={() => setMusculiaIdx((i) => (i + 1) % musculiaGallery.length)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/90 px-3 py-2 text-sm font-semibold text-zinc-900 shadow-lg backdrop-blur hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78] sm:right-4"
                              aria-label="Image suivante"
                            >
                              →
                            </button>
                          </div>

                          {/* Filmstrip */}
                          <div className="border-t border-zinc-200/80 bg-white px-4 py-3 sm:px-6">
                            <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                              {musculiaGallery.map((src, idx) => {
                                const isActive = idx === musculiaIdx;

                                return (
                                  <button
                                    key={`${src}-${idx}`}
                                    type="button"
                                    onClick={() => setMusculiaIdx(idx)}
                                    className={[
                                      "relative shrink-0 overflow-hidden rounded-lg border bg-white shadow-sm transition",
                                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F6B78]",
                                      isActive
                                        ? "border-[#0F6B78]/60 ring-2 ring-[#0F6B78]/20"
                                        : "border-zinc-200 hover:border-[#0F6B78]/35",
                                    ].join(" ")}
                                    aria-label={`Afficher l'image ${idx + 1}`}
                                  >
                                    <div
                                      className={
                                        isActive
                                          ? "relative h-16 w-28 sm:h-20 sm:w-36"
                                          : "relative h-14 w-24 sm:h-16 sm:w-28"
                                      }
                                    >
                                      <Image
                                        src={src}
                                        alt=""
                                        fill
                                        className="object-cover object-center"
                                        sizes={isActive ? "180px" : "140px"}
                                      />
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}