import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useSiteContent, useTestimonials } from "@/hooks/usePublicData";

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const { data: content } = useSiteContent("homepage");
  const { data: testimonials = [] } = useTestimonials();

  if (!testimonials.length) return null;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-secondary relative overflow-hidden">
      {/* Large decorative quote mark */}
      <div className="absolute top-12 left-12 md:left-20 text-[12rem] md:text-[20rem] leading-none font-serif text-accent/[0.04] select-none pointer-events-none">
        "
      </div>

      <div className="container mx-auto">
        <AnimatedSection className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-label text-accent">{content?.["testimonials.eyebrow"] || "Client Testimonials"}</span>
            <h2 className="text-headline mt-4">{content?.["testimonials.title"] || "Our Clients Trust Us"}</h2>
          </div>

          <div className="relative min-h-[280px] md:min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal leading-[1.4] text-foreground mb-10 italic">
                  "{testimonials[current].quote}"
                </blockquote>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-px bg-accent mb-4" />
                  <p className="font-serif text-lg text-foreground">
                    {testimonials[current].author}
                  </p>
                  <p className="text-label text-accent mt-1">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-500 hover:border-accent hover:text-accent hover:scale-105"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === current ? "bg-accent w-8" : "bg-border w-3 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-500 hover:border-accent hover:text-accent hover:scale-105"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
