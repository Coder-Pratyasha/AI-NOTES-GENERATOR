"use client";

import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import Sidebar from "@/components/home/Sidebar";
import { useUser } from "@clerk/nextjs";


export default function Home() {
   const { user } = useUser();
  return (
    <>
    <Sidebar userId={user?.id} />
    <div className="main-scroll md:ml-72 flex-1 overflow-y-auto h-screen">

      <HeroSection />

      <FeatureSection />

      <WorkflowSection />

    </div>
    </>
  );
}