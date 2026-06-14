import HeroSection from "../components/home/HeroSection";
import TimelineSection from "../components/home/TimelineSection";
import CommunitySection from "../components/home/CommunitySection";
import SkillsSection from "../components/home/SkillsSection";

export default function HomeView() {
  return (
    <div>
      <HeroSection />
      <TimelineSection />
      <CommunitySection />
      <SkillsSection />
    </div>
  );
}
