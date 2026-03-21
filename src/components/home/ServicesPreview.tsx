import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, Palette, Wrench, Armchair, Key, Compass } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useSiteContent } from "@/hooks/usePublicData";

const services = [
  {
    icon: Palette,
    title: "Residential Interior Design",
    description: "Living room, bedroom, modular kitchen, wardrobe & storage solutions — elegant spaces that reflect your personality.",
    num: "01",
  },
  {
    icon: Building2,
    title: "Office & Commercial Interiors",
    description: "Professional office interiors, space optimization, and lighting design for productive work environments.",
    num: "02",
  },
  {
    icon: Wrench,
    title: "House Construction Services",
    description: "Independent house, villa & apartment construction with structural, civil works, and professional supervision.",
    num: "03",
  },
  {
    icon: Key,
    title: "Renovation & Remodeling",
    description: "Home extensions, renovations, and turnkey remodeling projects — transforming existing spaces completely.",
    num: "04",
  },
  {
    icon: Armchair,
    title: "Custom Furniture & Space Planning",
    description: "Modular kitchen design, custom furniture manufacturing, and intelligent space optimization.",
    num: "05",
  },
  {
    icon: Compass,
    title: "Turnkey Construction Projects",
    description: "End-to-end project execution from planning and design to construction and finishing, on time and within budget.",
    num: "06",
  },
];

const ServicesPreview = () => {
  const { data: content } = useSiteContent("homepage");

  return (
    <section className="section-padding bg-atmosphere">
      <div className="container mx-auto">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <span className="text-label text-accent">{content?.["services.eyebrow"] || "What We Do"}</span>
            <h2 className="text-headline mt-4">{content?.["services.title"] || "Complete Interior & Construction Solutions"}</h2>
          </div>
          <Link
            to="/services"
            className="link-underline text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-500 inline-flex items-center gap-2 font-sans"
          >
            View All Services
            <ArrowUpRight size={14} />
          </Link>
        </AnimatedSection>

        <div className="space-y-0">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.title}
              delay={index * 0.08}
              className="group border-t border-border last:border-b py-8 md:py-10 cursor-pointer transition-colors duration-500 hover:bg-card/50"
            >
              <div className="flex items-center gap-6 md:gap-10">
                <span className="text-xs text-muted-foreground/40 font-sans tracking-widest w-8 hidden md:block">{service.num}</span>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:bg-accent/15 group-hover:scale-110">
                  <service.icon size={20} className="text-accent transition-transform duration-500 group-hover:rotate-6" />
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                  <h3 className="font-serif text-xl md:text-2xl md:w-56 flex-shrink-0 transition-colors duration-500 group-hover:text-accent">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{service.description}</p>
                </div>
                <ArrowUpRight size={18} className="text-muted-foreground/30 transition-all duration-500 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
