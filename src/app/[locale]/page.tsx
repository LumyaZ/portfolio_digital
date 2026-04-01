import PresentationHero from "@/components/PresentationHero";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  return <PresentationHero />;
}