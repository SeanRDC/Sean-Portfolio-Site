import Reveal from "../components/Reveal";

export default function WorkView() {
  return (
    <section className="flex min-h-screen items-center justify-center px-6 pt-28">
      <Reveal>
        <div className="glass glass-edge rounded-[24px] px-10 py-12 text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
            Selected Work
          </span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
            Pin-scroll showcase — building next
          </h1>
          <p className="mx-auto mt-4 max-w-md text-ink-muted">
            Beaded by Unknown · Flower Catalogue · Pixel E-Commerce · Debut
            Invitation
          </p>
        </div>
      </Reveal>
    </section>
  );
}
