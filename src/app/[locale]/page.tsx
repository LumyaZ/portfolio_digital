import PresentationHero from "@/components/PresentationHero";
import ProjectsSection from "@/components/ProjectsSection";
import SiteNavbar from "@/components/SiteNavBar";
import TrainingSection from "@/components/TrainingSection";
import StorySection from "@/components/StorySection";

export default function Home() {
  return (
    <>
      <PresentationHero />
      <SiteNavbar />
      <ProjectsSection />
      <TrainingSection />
      <StorySection />
    </>
  );
}