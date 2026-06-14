import { useParams, Link } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function ProjectView() {
  const { id } = useParams<{ id: string }>();
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-28">
      <Reveal>
        <div className="glass glass-edge rounded-[24px] px-10 py-12 text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">Project</span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">{id ?? "Detail"} — building next</h1>
          <Link to="/work" data-cursor className="mt-5 inline-block text-[15px] text-ink-muted transition-colors hover:text-ink">
            ← Back to Selected Work
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
