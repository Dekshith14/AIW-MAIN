import { useState } from "react";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { usePublishedProjects } from "@/hooks/usePublicData";
import { projects as hardcodedProjects, categoryHierarchy, MainCategory, SubCategory } from "@/data/projects";

const domains = ["All", "Residential", "Commercial", "Hospitality", "Interior", "Landscape", "Urban Design", "Institutional", "Others"];

const Projects = () => {
  const [activeDomain, setActiveDomain] = useState("All");
  const { data: dbProjects, isLoading } = usePublishedProjects();

  // Merge: DB projects first, then hardcoded as fallback
  const allProjects = (() => {
    const dbList = (dbProjects || []).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      domain: p.domain,
      image: p.cover_image || "/placeholder.svg",
      location: p.location || "",
      year: p.year || "",
      description: p.description || "",
    }));

    // If DB has projects, show those. Otherwise fall back to hardcoded.
    if (dbList.length > 0) return dbList;

    return hardcodedProjects.map((p) => ({
      id: String(p.id),
      slug: p.slug,
      title: p.title,
      domain: p.category.main,
      image: p.image,
      location: p.location,
      year: p.year,
      description: p.description,
    }));
  })();

  const filteredProjects = activeDomain === "All"
    ? allProjects
    : allProjects.filter((p) => p.domain === activeDomain);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <AnimatedSection className="max-w-3xl">
            <span className="text-label text-accent">Portfolio</span>
            <h1 className="text-display mt-4 mb-6">Our Projects</h1>
            <p className="text-body-large">
              Explore our collection of award-winning projects spanning residential,
              commercial, and hospitality sectors.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Domain Filter */}
      <section className="py-8 border-b border-border sticky top-[72px] bg-background z-30">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className={`px-4 py-2 text-sm uppercase tracking-widest transition-colors ${
                  activeDomain === domain
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {domain === "All" ? "All Projects" : domain}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No projects found in this category.</p>
              <button
                onClick={() => setActiveDomain("All")}
                className="mt-4 text-accent hover:underline"
              >
                View all projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <AnimatedSection
                  key={project.id}
                  delay={index * 0.1}
                  className="group relative overflow-hidden cursor-pointer"
                >
                  <Link to={`/projects/${project.slug}`}>
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <span className="text-label text-gold-light">
                        {project.domain}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-primary-foreground mt-2">
                        {project.title}
                      </h3>
                      <p className="text-stone text-sm mt-2">{project.location}</p>
                    </div>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gold flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <ArrowUpRight size={18} className="text-charcoal-dark" />
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
