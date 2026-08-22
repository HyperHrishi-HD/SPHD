"use client";

import HeroSection from "@/components/HeroSection";
import BackgroundMusic from "@/components/BackgroundMusic";
import PolaroidWall from "@/components/PolaroidWall";
import LetterSection from "@/components/LetterSection";
import VideoSection from "@/components/VideoSection";
import CreditsSection from "@/components/CreditsSection";

export default function Home() {
  return (
    <>
      <BackgroundMusic />
      <HeroSection />
      <PolaroidWall />
      <LetterSection />
      <VideoSection />
      <CreditsSection />
    </>
  );
}
