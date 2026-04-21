import {getLocale, getTranslations} from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import type {ProjectId} from "@/data/projects";
import {PROJECT_COVER, PROJECT_IDS} from "@/data/projects";

export default async function ProjectsSection() {
  const t = await getTranslations("projects");
  const locale = await getLocale();

  return (
    <section id="projects" className="relative scroll-mt-32 overflow-hidden py-0">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#fafafa_0%,#ffffff_45%,#f4fafb_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#0F6B78]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#0F6B78_0.8px,transparent_0.8px)] [background-size:22px_22px]"
        aria-hidden
      />

      <ul className="relative w-full list-none">
        {PROJECT_IDS.map((id: ProjectId, index) => {
          const reverse = index % 2 === 1;
          const isDynatrust = id === "dynatrust";
          const cover = PROJECT_COVER[id];
          const title = t(`items.${id}.title`);
          const hoverTitle = t(`items.${id}.hoverTitle`);

          const slideIn = reverse
            ? "-translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
            : "translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100";

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

              <Link
                href={`/${locale}/projets/${id}`}
                className="group block text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#0F6B78] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fafafa]"
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
                      isDynatrust ? "bg-[#5327A7]" : "bg-white",
                    ].join(" ")}
                  >
                    {cover ? (
                      <Image
                        src={cover}
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
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}