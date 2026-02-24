import AnimatedSection from "@/components/ui/AnimatedSection";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Home Interiors Delivered" },
  { value: 1000, suffix: "+", label: "Commercial Spaces Executed" },
  { value: 45, suffix: "", label: "Days Delivery" },
  { value: 10, suffix: "", label: "Years Warranty" },
];

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-serif text-accent">
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-atmosphere-dark relative overflow-hidden">
      {/* Decorative corner elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-accent/10" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-accent/10" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <AnimatedSection
              key={stat.label}
              delay={index * 0.12}
              className="text-center relative"
            >
              <CountUp value={stat.value} suffix={stat.suffix} />
              <div className="w-8 h-px bg-accent/30 mx-auto mt-5 mb-4" />
              <p className="text-label text-stone">{stat.label}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
