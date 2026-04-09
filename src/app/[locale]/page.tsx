import PresentationHero from "@/components/PresentationHero";
import ProjectsSection from "@/components/ProjectsSection";
import SiteNavbar from "@/components/SiteNavBar";
import TrainingSection from "@/components/TrainingSection";
import StorySection from "@/components/StorySection";
import AboutSection from "@/components/AboutSection";
import TechSection from "@/components/TechSection";

export default function Home() {
  return (
    <>
      <PresentationHero />
      <SiteNavbar />
      <ProjectsSection />
      <TrainingSection />
      <TechSection />
      <StorySection />
      <AboutSection />
    </>
  );
}