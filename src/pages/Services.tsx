import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Building2, Compass, Armchair, Key, Ruler } from "lucide-react";
import { useSiteContent } from "@/hooks/usePublicData";

const services = [
  {
    icon: Palette,
    title: "Specialized Interiors",
    description:
      "Full interior fit-out from concept to completion. We deliver sophisticated interior spaces across corporate offices, healthcare facilities, hospitality venues, and residential projects.",
    features: [
      "Space Planning & Design",
      "Material Sourcing & Selection",
      "Lighting Design",
      "Custom Finishes & Detailing",
    ],
  },
  {
    icon: Building2,
    title: "Civil & MEP Services",
    description:
      "Comprehensive civil, electrical, plumbing, and MEP works for all building types. Our team ensures compliance with local and international standards while maintaining cost-effectiveness.",
    features: [
      "Civil Construction Works",
      "Electrical & Plumbing",
      "HVAC & Fire Safety",
      "Structural Renovations",
    ],
  },
  {
    icon: Compass,
    title: "Architectural Design & CAD",
    description:
      "We handle projects from any stage of completion — initial concept, design development, or final drafting. We provide design detailing and preparation of complete documentation.",
    features: [
      "Concept to Final Drafting",
      "Design Detailing",
      "Complete Documentation",
      "3D Visualization",
    ],
  },
  {
    icon: Armchair,
    title: "Workshop & Furniture Manufacturing",
    description:
      "State-of-the-art workshop delivering customized modular furniture designed to meet diverse client needs. Every product is crafted with precision using premium-quality raw materials.",
    features: [
      "Modular Office Furniture",
      "Conference & Boardroom Tables",
      "Reception Counters & Desks",
      "Ergonomic Seating Solutions",
    ],
  },
  {
    icon: Key,
    title: "Turnkey Projects",
    description:
      "End-to-end project management and delivery with a proven track record of completing projects on time and within budget. Single point of contact for seamless execution.",
    features: [
      "End-to-End Management",
      "Single Point of Contact",
      "Quality Assurance",
      "On-Time Delivery",
    ],
  },
  {
    icon: Ruler,
    title: "Project Consultation",
    description:
      "Expert guidance and strategic planning to help you navigate complex construction and design decisions. We provide site appraisals, planning, and feasibility studies.",
    features: [
      "Site & Project Appraisals",
      "Feasibility Studies",
      "Budget & Timeline Planning",
      "Vendor Selection",
    ],
  },
];

const Services = () => {
  const { data: content } = useSiteContent("services");

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <AnimatedSection className="max-w-3xl">
            <span className="text-label text-accent">{content?.["hero.eyebrow"] || "Our Expertise"}</span>
            <h1 className="text-display mt-4 mb-6">{content?.["hero.title"] || "Services"}</h1>
            <p className="text-body-large">
              {content?.["hero.description"] || "Comprehensive interiors, civil, and MEP services tailored to bring your vision to life with precision and artistry."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection
                key={service.title}
                delay={index * 0.1}
                className="bg-card p-8 md:p-12 card-hover group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-sm bg-muted flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-accent/20">
                    <service.icon size={24} className="text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl mb-4">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Reference Markets */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-label text-accent">{content?.["markets.eyebrow"] || "Industries We Serve"}</span>
            <h2 className="text-headline mt-3">{content?.["markets.title"] || "Reference Markets"}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Corporate", desc: "Offices & IT Parks" },
              { name: "Hospitality", desc: "Hotels & Venues" },
              { name: "Retail", desc: "Showrooms & Stores" },
              { name: "Healthcare", desc: "Hospitals & Clinics" },
              { name: "Industries", desc: "Manufacturing & Logistics" },
              { name: "Residential", desc: "Homes & Apartments" },
            ].map((market, index) => (
              <AnimatedSection
                key={market.name}
                delay={index * 0.1}
                className="text-center p-6 bg-card card-hover"
              >
                <h3 className="font-serif text-lg mb-1">{market.name}</h3>
                <p className="text-xs text-muted-foreground">{market.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding">
        <div className="container mx-auto">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-label text-accent">{content?.["process.eyebrow"] || "How We Work"}</span>
            <h2 className="text-headline mt-3">{content?.["process.title"] || "Our Process"}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", desc: "Understanding your vision and requirements" },
              { step: "02", title: "Design", desc: "Creating detailed plans and visualizations" },
              { step: "03", title: "Build", desc: "Expert execution with quality craftsmanship" },
              { step: "04", title: "Deliver", desc: "Seamless handover and ongoing support" },
            ].map((item, index) => (
              <AnimatedSection
                key={item.step}
                delay={index * 0.15}
                className="text-center relative"
              >
                <span className="text-6xl font-serif text-accent/20">{item.step}</span>
                <h3 className="font-serif text-xl mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-px bg-border" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-charcoal text-primary-foreground">
        <div className="container mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-headline mb-6">
              {content?.["cta.title"] || "Ready to Start Your Project?"}
            </h2>
            <p className="text-lg text-stone max-w-xl mx-auto mb-10">
              {content?.["cta.description"] || "Let's discuss how we can bring your vision to life. Contact us for a free consultation."}
            </p>
            <Link to="/contact" className="btn-gold inline-flex items-center gap-2 group">
              {content?.["cta.button_label"] || "Get Free Consultation"}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
