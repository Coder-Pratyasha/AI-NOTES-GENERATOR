import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import WorkflowSection from "@/components/home/WorkflowSection";

export default function Home() {
  return (
    <div className="main-scroll ml-72 flex-1 overflow-y-auto h-screen">

      <HeroSection />

      <FeatureSection />

      <WorkflowSection />

    </div>
  );
}