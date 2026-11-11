/*
  Suds cover the hero photo on load, swell, then pop one by one to reveal it.
  Pure CSS so it still plays (and finishes) before JavaScript hydrates.
*/
const FOAM: { x: number; y: number; size: number }[] = [
  { x: 15, y: 12, size: 48 },
  { x: 85, y: 88, size: 50 },
  { x: 50, y: 37, size: 52 },
  { x: 15, y: 62, size: 48 },
  { x: 85, y: 14, size: 46 },
  { x: 50, y: 88, size: 50 },
  { x: 85, y: 50, size: 44 },
  { x: 18, y: 90, size: 42 },
  { x: 50, y: 10, size: 40 },
  { x: 40, y: 64, size: 46 },
  { x: 70, y: 70, size: 38 },
  { x: 28, y: 36, size: 36 },
];

const START_DELAY_S = 0.45;
const STAGGER_S = 0.07;

export function FoamReveal() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 motion-reduce:hidden">
      <div className="absolute inset-0 animate-foam-fade bg-lagoon-light" style={{ animationDelay: `${START_DELAY_S + 0.15}s` }} />
      {FOAM.map((bubble, index) => (
        <span
          key={index}
          className="absolute block aspect-square animate-foam-pop rounded-full bg-white shadow-[inset_-8px_-10px_18px_rgba(108,196,212,0.35)]"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}%`,
            animationDelay: `${START_DELAY_S + index * STAGGER_S}s`,
          }}
        />
      ))}
    </div>
  );
}
