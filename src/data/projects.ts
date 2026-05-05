export const PROJECT_IDS = ["dynatrust", "musculia", "ytechUnion", "craft2give"] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

export const PROJECT_COVER: Record<ProjectId, string | null> = {
  dynatrust: "/projets/dynatrust-logo.png",
  musculia: "/projets/musculia-home.png",
  ytechUnion: "/projets/ytechunion-home.png",
  craft2give: "/projets/craft2give-home.png",
};

export const PROJECT_COVER_POPUP: Record<ProjectId, string | null> = {
  dynatrust: "/projets/dynatrust-logo.png",
  musculia: "/projets/musculia-header3.png",
  ytechUnion: "/projets/ytechunion-header.png",
  craft2give: "/projets/craft2give-header2.png",
};

export function getProjectCoverPopup(id: ProjectId): string | null {
  return PROJECT_COVER_POPUP[id] ?? PROJECT_COVER[id];
}

export function isProjectSlug(slug: string): slug is ProjectId {
  return (PROJECT_IDS as readonly string[]).includes(slug);
}

export const PROJECT_WEB_URL: Record<ProjectId, string | null> = {
  dynatrust: "https://dynatrust.io/",
  musculia: null,
  ytechUnion: "https://ytechunion-site.vercel.app/",
  craft2give: "https://64a8008efe9c4e009801dd0b--celebrated-khapse-3ab800.netlify.app",
};

export const PROJECT_GALLERY: Partial<Record<ProjectId, string[]>> = {
  musculia: [
    "/projets/musculia-screen/musculia-1.png",
    "/projets/musculia-screen/musculia-2.png",
    "/projets/musculia-screen/musculia-4.png",
    "/projets/musculia-screen/musculia-5.png",
    "/projets/musculia-screen/musculia-6.png",
    "/projets/musculia-screen/musculia-7.png",
    "/projets/musculia-screen/musculia-8.png",
    "/projets/musculia-screen/musculia-9.png",
    "/projets/musculia-screen/musculia-10.png",
  ],
};