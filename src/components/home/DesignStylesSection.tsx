import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface StyleCard {
  title: string;
  images: string[];
}

const defaultStyles: StyleCard[] = [
  {
    title: "Contemporary",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    ],
  },
  {
    title: "Minimalistic",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ez633a2ab?w=600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    ],
  },
  {
    title: "Modern Classic",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    ],
  },
  {
    title: "English Classic",
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    ],
  },
  {
    title: "Indian Classic",
    images: [
      "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=600&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
      "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80",
    ],
  },
];

const StyleCarousel = ({ card }: { card: StyleCard }) => {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? card.images.length - 1 : c - 1));
  }, [card.images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c === card.images.length - 1 ? 0 : c + 1));
  }, [card.images.length]);

  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
        {card.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${card.title} design ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
          />
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-accent/90 text-accent-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-accent/90 text-accent-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-accent active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {card.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-accent w-5"
                  : "bg-primary-foreground/50 hover:bg-primary-foreground/80"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <h3 className="text-center font-sans text-xs uppercase tracking-[0.2em] text-foreground mt-5">
        {card.title}
      </h3>
    </div>
  );
};

const DesignStylesSection = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-label text-accent">Our Expertise</span>
            <h2 className="text-headline mt-4">Widest Range of International Designs</h2>
            <p className="text-muted-foreground font-sans mt-4 max-w-2xl leading-relaxed">
              Book a consult with our highly experienced interior designers & get personalised design choices for your dream home.
            </p>
          </div>
          <Link
            to="/request-quote"
            className="btn-gold inline-flex items-center gap-3 group shrink-0"
          >
            Get A Quote
          </Link>
        </AnimatedSection>

        {/* Top row — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {defaultStyles.slice(0, 3).map((card, i) => (
            <AnimatedSection key={card.title} delay={i * 0.1}>
              <StyleCarousel card={card} />
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom row — 2 cards, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2 lg:px-[16.67%]">
          {defaultStyles.slice(3).map((card, i) => (
            <AnimatedSection key={card.title} delay={(i + 3) * 0.1}>
              <StyleCarousel card={card} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignStylesSection;
