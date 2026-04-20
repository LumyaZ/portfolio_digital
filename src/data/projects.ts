/** Identifiants stables pour i18n + futures routes /projets/[slug] */
export const PROJECT_IDS = [
    "dynatrust",
    "musculia",
    "ytechUnion",
    "craft2give",
  ] as const;
  
  export type ProjectId = (typeof PROJECT_IDS)[number];
  
  export const PROJECT_COVER: Record<ProjectId, string | null> = {
    dynatrust: "/projets/dynatrust-logo.png",
    musculia: "/projets/musculia-home.png",
    ytechUnion: "/projets/ytechunion-home.png",
    craft2give: "/projets/craft2give-home.png",
  };