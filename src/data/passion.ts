const SIMPLE_ICONS_CDN =
  "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons";

export type PassionId = "music" | "running" | "gaming" | "travel" | "nba" | "cooking";

export type Passion = {
  id: PassionId;
  iconSrc: string;
};

export const PASSIONS: Passion[] = [
  {id: "music", iconSrc: `${SIMPLE_ICONS_CDN}/spotify.svg`},
  {id: "running", iconSrc: `${SIMPLE_ICONS_CDN}/strava.svg`},
  {id: "gaming", iconSrc: `${SIMPLE_ICONS_CDN}/steam.svg`},
  {id: "travel", iconSrc: `${SIMPLE_ICONS_CDN}/airbnb.svg`},
  {id: "nba", iconSrc: `${SIMPLE_ICONS_CDN}/nba.svg`},
  {id: "cooking", iconSrc: `${SIMPLE_ICONS_CDN}/hellofresh.svg`}
];