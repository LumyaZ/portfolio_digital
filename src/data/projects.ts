/** Identifiants stables pour i18n + futures routes /projets/[slug] */
export const PROJECT_IDS = [
    "portfolio",
    "saas-dashboard",
    "api-gateway",
    "data-pipeline",
    "mobile-app"
  ] as const;
  
  export type ProjectId = (typeof PROJECT_IDS)[number];
  
  /** Couverture optionnelle dans /public — ex. "/projects/portfolio.jpg". null = placeholder dégradé */
  export const PROJECT_COVER: Record<ProjectId, string | null> = {
    portfolio: null,
    "saas-dashboard": null,
    "api-gateway": null,
    "data-pipeline": null,
    "mobile-app": null
  };