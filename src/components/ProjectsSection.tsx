import {getTranslations} from "next-intl/server";

import ProjectCardsList from "@/components/ProjectCardsList";

export default async function ProjectsSection() {
  const t = await getTranslations("projects");

  return (
    <section
      id="projects"
      className="relative scroll-mt-32 overflow-hidden py-0"
      aria-labelledby="projects-heading"
    >
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
        className="pointer-events-none absolute inset-0 opacity-[0.35] bg-[radial-gradient(#0F6B78_0.8px,transparent_0.8px)] bg-size-[22px_22px]"
        aria-hidden
      />

      <div className="relative">
        <header className="mx-auto max-w-7xl px-6 pt-14 text-center sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
          <h2
            id="projects-heading"
            className="text-3xl font-bold tracking-tight text-[#0F6B78] sm:text-4xl md:text-5xl"
          >
            {t("title")}
          </h2>
        </header>
        <ProjectCardsList />
      </div>
    </section>
  );
}