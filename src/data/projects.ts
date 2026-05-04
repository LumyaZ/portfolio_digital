/** Identifiants stables pour i18n + futures routes /projets/[slug] */
export const PROJECT_IDS = ["dynatrust", "musculia", "ytechUnion", "craft2give"] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];

/** Visuel des cartes sur la page d’accueil (liste projets). */
export const PROJECT_COVER: Record<ProjectId, string | null> = {
  dynatrust: "/projets/dynatrust-logo.png",
  musculia: "/projets/musculia-home.png",
  ytechUnion: "/projets/ytechunion-home.png",
  craft2give: "/projets/craft2give-home.png",
};

/** Visuel dédié à la modale (ex. bannière). null → on réutilise PROJECT_COVER. */
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
  dynatrust: null,
  musculia: null,
  ytechUnion: null,
  craft2give: null,
};