import PresentationHero from "@/components/PresentationHero";
import ProjectsSection from "@/components/ProjectsSection";
import SiteNavbar from "@/components/SiteNavBar";

export default function Home() {
  return (
    <>
      <PresentationHero />
      <SiteNavbar />
      <ProjectsSection />
    </>
  );
}