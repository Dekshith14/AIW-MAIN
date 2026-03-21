import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Award, Users, Target, Lightbulb } from "lucide-react";
import aboutHero from "@/assets/about-hero.jpg";
import team1 from "@/assets/team-1.jpg";
import { useSiteContent } from "@/hooks/usePublicData";

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We pursue perfection in every project, ensuring exceptional quality and craftsmanship that meets the highest industry standards.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace cutting-edge techniques and sustainable practices, continuously challenging industry norms.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with clients to gain a deep understanding of their aspirations and the culture they wish to create.",
  },
  {
    icon: Target,
    title: "Integrity",
    description: "Our management philosophy is built on dedication, integrity, exceptional service, and quality workmanship.",
  },
];

const About = () => {
  const { data: content } = useSiteContent("about");

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt="About AIW"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-charcoal-dark/70" />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 pt-20">
          <AnimatedSection>
            <span className="text-label text-gold-light">{content?.["hero.eyebrow"] || "About Us"}</span>
            <h1 className="text-display text-primary-foreground mt-4">
              {content?.["hero.title"] || "Our Story"}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <AnimatedSection>
              <span className="text-label text-accent">{content?.["story.eyebrow"] || "Who We Are"}</span>
              <h2 className="text-headline mt-3 mb-6">
                {content?.["story.title"] || "Building Spaces Since 2013"}
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>{content?.["story.paragraph_1"] || "Founded in 2013, AIW is a dynamic specialist organization delivering services across multiple domains. We bring together broad-minded professionals from diverse disciplines and encourage them to think beyond their specialization, driving innovation and excellence."}</p>
                <p>{content?.["story.paragraph_2"] || "We maintain a strong competitive edge through efficiency, flexibility, and an unwavering commitment to quality. Our primary focus is on delivering high-quality, cost-effective services that comply with both local and international standards while remaining deeply respectful of the environment."}</p>
                <p>{content?.["story.paragraph_3"] || "Today, AIW continues to achieve steady growth and proudly employs nearly 50 skilled professionals. With offices in Tamil Nadu and Telangana, our strong resource base ensures capacity and expertise to deliver projects on time while meeting the highest quality standards."}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="relative">
                <img
                  src={team1}
                  alt="AIW Team at Work"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6">
                  <p className="font-serif text-lg">{content?.["story.badge_title"] || "Since 2013"}</p>
                  <p className="text-xs uppercase tracking-widest mt-1 opacity-80">
                    {content?.["story.badge_label"] || "Interior Contractor of Choice"}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatedSection className="bg-card p-10 md:p-12">
              <div className="gold-line mb-6" />
              <h3 className="text-subheadline mb-4">{content?.["vision.title"] || "Our Vision"}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {content?.["vision.body"] || "To be the foremost authority in creating spaces that inspire through competent, timely, and cost-effective solutions. We envision a world where every built environment enhances the lives of those who inhabit it."}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="bg-card p-10 md:p-12">
              <div className="gold-line mb-6" />
              <h3 className="text-subheadline mb-4">{content?.["mission.title"] || "Our Mission"}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {content?.["mission.body"] || "To deliver high-quality, cost-effective services that comply with both local and international standards while remaining deeply respectful of the environment and prioritizing the health and safety of our workforce."}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-label text-accent">{content?.["values.eyebrow"] || "Our Values"}</span>
            <h2 className="text-headline mt-3">{content?.["values.title"] || "What Drives Us"}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection
                key={value.title}
                delay={index * 0.1}
                className="text-center p-8"
              >
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} className="text-accent" />
                </div>
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-charcoal text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "100+", label: "Projects Completed" },
              { value: "12+", label: "Years of Excellence" },
              { value: "50+", label: "Professionals" },
              { value: "6+", label: "Sectors Served" },
            ].map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <p className="text-4xl md:text-5xl font-serif text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-label text-stone">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
