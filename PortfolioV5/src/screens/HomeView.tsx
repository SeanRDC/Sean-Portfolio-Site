import FilmGrain from "../components/FilmGrain";
import Nav from "../components/Nav";
import ApertureScene from "../components/scenes/ApertureScene";
import ProfileScene from "../components/scenes/ProfileScene";
import ProjectsScene from "../components/scenes/ProjectsScene";
import TechStackScene from "../components/scenes/TechStackScene";
import RingScene from "../components/scenes/RingScene";
import ContactScene from "../components/scenes/ContactScene";

export default function HomeView() {
  return (
    <div className="relative bg-paper">
      <FilmGrain />
      <Nav />
      <main className="relative z-10">
        <ApertureScene />
        <ProfileScene />
        <ProjectsScene />
        <TechStackScene />
        <RingScene />
        <ContactScene />
      </main>
    </div>
  );
}
