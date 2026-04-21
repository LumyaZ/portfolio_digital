import {getTranslations} from "next-intl/server";
import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import SiteNavbar from "@/components/SiteNavBar";
import {isProjectSlug, PROJECT_COVER, PROJECT_IDS, type ProjectId} from "@/data/projects";

type PageProps = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const locales = ["fr", "en"] as const;
  const out: {locale: string; slug: ProjectId}[] = [];
  for (const locale of locales) {
    for (const slug of PROJECT_IDS) {
      out.push({locale, slug});
    }
  }
  return out;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  if (!isProjectSlug(slug)) {
    return {title: "Portfolio"};
  }
  const t = await getTranslations("projects");
  const title = t(`items.${slug}.title`);
  return {
    title: `${title} — Portfolio`,
    description: t(`items.${slug}.description`),
  };
}

export default async function ProjectDetailPage({params}: PageProps) {
  const {locale, slug} = await params;
  if (!isProjectSlug(slug)) {
    notFound();
  }

  const t = await getTranslations("projects");
  const cover = PROJECT_COVER[slug];
  const title = t(`items.${slug}.title`);
  const tags = t(`items.${slug}.tags`)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <>
      <div className="border-b border-[#0F6B78]/25 bg-[#fafafa]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <SiteNavbar />
          <Link
            href={`/${locale}#projects`}
            className="mt-4 inline-flex text-sm font-medium text-[#0F6B78] underline-offset-4 hover:underline"
          >
            ← {t("backToList")}
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F6B78]">{t(`items.${slug}.badge`)}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">{title}</h1>

        {cover ? (
          <div
            className={`relative mt-8 aspect-video w-full max-w-4xl overflow-hidden rounded-xl border border-zinc-200/90 shadow-sm ${
              slug === "dynatrust" ? "bg-[#5327A7]" : "bg-white"
            }`}
          >
            <Image
              src={cover}
              alt=""
              width={1600}
              height={900}
              className="h-full w-full object-contain object-center p-4 sm:p-8"
              priority
              sizes="(min-width: 1024px) 56rem, 100vw"
              aria-hidden
            />
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-10 max-w-3xl whitespace-pre-line text-base leading-relaxed text-zinc-700 sm:text-lg">
          {t(`items.${slug}.detailBody`)}
        </p>
      </main>
    </>
  );
}