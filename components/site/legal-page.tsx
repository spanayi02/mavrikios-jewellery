interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  return (
    <div className="container-mavrikios py-16 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-stone-500">{eyebrow}</p>
        <h1 className="font-serif text-4xl italic text-ink-950 sm:text-5xl">{title}</h1>
        <p className="mt-5 text-[15px] leading-relaxed text-stone-600">{intro}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-serif text-xl text-ink-950">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-stone-600">
                {section.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
