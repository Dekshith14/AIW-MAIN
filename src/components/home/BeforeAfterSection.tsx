import { useState, useRef, useCallback } from "react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ComparisonItem {
  before: string;
  after: string;
  title: string;
  caption?: string;
}

const defaultItems: ComparisonItem[] = [
  {
    before: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    after: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    title: "Living Room Transformation",
    caption: "From dated layout to contemporary open-plan living",
  },
  {
    before: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    title: "Kitchen Renovation",
    caption: "Complete modular kitchen redesign with premium finishes",
  },
  {
    before: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    after: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    title: "Bedroom Makeover",
    caption: "Warm tones and custom cabinetry for restful retreats",
  },
];

const ImageSlider = ({ item }: { item: ComparisonItem }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div className="space-y-4">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] overflow-hidden cursor-col-resize select-none touch-none rounded-sm"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* After image (full) */}
        <img
          src={item.after}
          alt={`${item.title} — after`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />

        {/* Before image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={item.before}
            alt={`${item.title} — before`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${containerRef.current?.offsetWidth || 9999}px`, maxWidth: "none" }}
            loading="lazy"
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-accent z-10"
          style={{ left: `${position}%` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-lg">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-accent-foreground">
              <path d="M5 9H1M5 9L3 7M5 9L3 11M13 9H17M13 9L15 7M13 9L15 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-4 left-4 bg-charcoal-dark/70 backdrop-blur-sm text-primary-foreground text-[0.65rem] uppercase tracking-[0.15em] px-3 py-1.5 font-sans z-10">
          Before
        </span>
        <span className="absolute top-4 right-4 bg-accent/90 text-accent-foreground text-[0.65rem] uppercase tracking-[0.15em] px-3 py-1.5 font-sans z-10">
          After
        </span>
      </div>

      <div>
        <h3 className="font-serif text-xl text-foreground">{item.title}</h3>
        {item.caption && (
          <p className="text-sm text-muted-foreground font-sans mt-1">{item.caption}</p>
        )}
      </div>
    </div>
  );
};

const BeforeAfterSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto">
        <AnimatedSection className="mb-16">
          <span className="text-label text-accent">Transformations</span>
          <h2 className="text-headline mt-4">Before & After</h2>
          <p className="text-muted-foreground font-sans mt-4 max-w-2xl leading-relaxed">
            Drag the slider to reveal how we transform ordinary spaces into extraordinary living experiences.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {defaultItems.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.12}>
              <ImageSlider item={item} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
