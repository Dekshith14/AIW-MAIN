import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useFeaturedProjects } from "@/hooks/usePublicData";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectInterior from "@/assets/project-interior.jpg";

const fallbackProjects = [
  { id: "1", title: "Serenity Villa", domain: "Residential", image: projectResidential, location: "Beverly Hills, CA", slug: "serenity-villa" },
  { id: "2", title: "Nexus Office Complex", domain: "Commercial", image: projectCommercial, location: "Manhattan, NY", slug: "nexus-office" },
  { id: "3", title: "The Haven Suite", domain: "Interior Design", image: projectInterior, location: "Miami, FL", slug: "haven-suite" },
];

const FeaturedProjects = () => {
  const { data: dbFeatured } = useFeaturedProjects();

  const projects = (dbFeatured && dbFeatured.length > 0)
    ? dbFeatured.map((p) => ({
        id: p.id,
        title: p.title,
        domain: p.domain,
        image: p.cover_image || "/placeholder.svg",
        location: p.location || "",
        slug: p.slug,
      }))
    : fallbackProjects;

  return (
    <section className="section-padding bg-secondary">
      <div className="container mx-auto">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <span className="text-label text-accent">Our Recent Projects</span>
            <h2 className="text-headline mt-4">Quality Craftsmanship & Innovative Designs</h2>
          </div>
          <Link
            to="/projects"
            className="link-underline text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-500 inline-flex items-center gap-2 font-sans"
          >
            View All Projects
            <ArrowUpRight size={14} />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.slice(0, 3).map((project, index) => (
            <AnimatedSection
              key={project.id}
              delay={index * 0.15}
              className={`group relative overflow-hidden cursor-pointer ${
                index === 0 ? "md:col-span-7" : index === 1 ? "md:col-span-5" : "md:col-span-12"
              }`}
            >
              <Link to={`/projects/${project.slug}`}>
                <div className={`overflow-hidden ${index === 2 ? "aspect-[21/9]" : "aspect-[4/5]"}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                  <span className="text-label text-gold-light">{project.domain}</span>
                  <h3 className="font-serif text-2xl md:text-4xl text-primary-foreground mt-3 transition-transform duration-700 group-hover:translate-x-2">
                    {project.title}
                  </h3>
                  <p className="text-stone/80 text-sm mt-2 font-sans">{project.location}</p>
                </div>
                <div className="absolute top-6 right-6 w-11 h-11 rounded-full bg-accent flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-600">
                  <ArrowUpRight size={18} className="text-accent-foreground" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
