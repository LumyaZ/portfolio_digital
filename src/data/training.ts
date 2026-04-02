/** Identifiants stables pour i18n */
export const TRAINING_IDS = ["master", "bachelor", "bts"] as const;

export type TrainingId = (typeof TRAINING_IDS)[number];