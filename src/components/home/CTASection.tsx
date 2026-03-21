import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useSiteContent } from "@/hooks/usePublicData";

const CTASection = () => {
  const { data: content } = useSiteContent("homepage");

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <AnimatedSection className="relative bg-atmosphere-dark p-12 md:p-24 text-center overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l border-t border-accent/15" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-accent/15" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

          <span className="text-label text-accent relative z-10">{content?.["cta.eyebrow"] || "Get Free Consultation"}</span>
          <h2 className="text-headline mt-5 mb-8 text-primary-foreground relative z-10">
            {content?.["cta.title_line_1"] || "Planning Your Dream"}
            <br />
            <span className="italic">{content?.["cta.title_line_2"] || "Home or Office?"}</span>
          </h2>
          <p className="text-lg text-stone max-w-2xl mx-auto mb-12 leading-[1.8] font-light font-sans relative z-10">
            {content?.["cta.description"] ||
              "Talk to our interior and construction experts and receive a free consultation and project estimate. No hidden costs, transparent pricing."}
          </p>
          <Link
            to="/request-quote"
            className="btn-gold inline-flex items-center gap-3 group relative z-10"
          >
            {content?.["cta.button_label"] || "Get Your Free Consultation"}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CTASection;
