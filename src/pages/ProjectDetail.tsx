import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProjectGallery from "@/components/ui/ProjectGallery";
import { useProjectBySlug, useProjectImages } from "@/hooks/usePublicData";
import { getProjectBySlug as getHardcodedProject, projects as hardcodedProjects } from "@/data/projects";
import { ArrowLeft, MapPin, Calendar, Maximize } from "lucide-react";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { data: dbProject, isLoading } = useProjectBySlug(slug || "");
  const { data: dbImages } = useProjectImages(dbProject?.id || "");

  // Fallback to hardcoded
  const hardcoded = getHardcodedProject(slug || "");

  if (isLoading) {
    return (
      <Layout>
        <div className="section-padding text-center pt-40">
          <p className="text-muted-foreground text-lg">Loading project...</p>
        </div>
      </Layout>
    );
  }

  // Use DB project if available, else hardcoded
  if (dbProject) {
    const galleryImages = (dbImages || []).map((img) => img.image_url);
    const mainImage = dbProject.cover_image || "/placeholder.svg";

    return (
      <Layout>
        <section className="relative pt-20">
          <ProjectGallery
            mainImage={mainImage}
            gallery={galleryImages}
            title={dbProject.title}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal-dark/80 via-charcoal-dark/30 to-transparent pointer-events-none h-40" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 pointer-events-none">
            <div className="container mx-auto">
              <AnimatedSection>
                <span className="text-label text-gold-light">{dbProject.domain}</span>
                <h1 className="text-display text-primary-foreground mt-4">
                  {dbProject.title}
                </h1>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              <div className="lg:col-span-2">
                <AnimatedSection>
                  <Link to="/projects" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
                    <ArrowLeft size={16} /> Back to Projects
                  </Link>
                  <h2 className="text-subheadline mb-6">About This Project</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                    {dbProject.description || "No description available."}
                  </p>

                  {dbProject.highlights && dbProject.highlights.length > 0 && (
                    <>
                      <h3 className="font-serif text-xl mb-4">Project Highlights</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                        {dbProject.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-3 text-muted-foreground">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </AnimatedSection>
              </div>

              <div>
                <AnimatedSection delay={0.2} className="bg-secondary p-8 sticky top-32">
                  <h3 className="text-label text-accent mb-6">Project Details</h3>
                  <div className="space-y-6">
                    {dbProject.location && (
                      <div className="flex items-start gap-4">
                        <MapPin size={20} className="text-accent mt-0.5" />
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                          <p className="font-serif text-lg">{dbProject.location}</p>
                        </div>
                      </div>
                    )}
                    {dbProject.year && (
                      <div className="flex items-start gap-4">
                        <Calendar size={20} className="text-accent mt-0.5" />
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Year</p>
                          <p className="font-serif text-lg">{dbProject.year}</p>
                        </div>
                      </div>
                    )}
                    {dbProject.area && (
                      <div className="flex items-start gap-4">
                        <Maximize size={20} className="text-accent mt-0.5" />
                        <div>
                          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Area</p>
                          <p className="font-serif text-lg">{dbProject.area}</p>
                        </div>
                      </div>
                    )}
                    {dbProject.style && (
                      <div className="pt-6 border-t border-border">
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Style</p>
                        <p className="font-serif text-lg">{dbProject.style}</p>
                      </div>
                    )}
                    {dbProject.duration && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Duration</p>
                        <p className="font-serif text-lg">{dbProject.duration}</p>
                      </div>
                    )}
                    {dbProject.client && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Client</p>
                        <p className="font-serif text-lg">{dbProject.client}</p>
                      </div>
                    )}
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // Fallback to hardcoded project
  if (!hardcoded) {
    return (
      <Layout>
        <div className="section-padding text-center pt-40">
          <h1 className="text-headline mb-4">Project Not Found</h1>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative pt-20">
        <ProjectGallery
          mainImage={hardcoded.image}
          gallery={hardcoded.gallery}
          title={hardcoded.title}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal-dark/80 via-charcoal-dark/30 to-transparent pointer-events-none h-40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20 pointer-events-none">
          <div className="container mx-auto">
            <AnimatedSection>
              <span className="text-label text-gold-light">{hardcoded.category.main}</span>
              <h1 className="text-display text-primary-foreground mt-4">{hardcoded.title}</h1>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
            <div className="lg:col-span-2">
              <AnimatedSection>
                <Link to="/projects" className="inline-flex items-center gap-2 text-accent hover:underline mb-8">
                  <ArrowLeft size={16} /> Back to Projects
                </Link>
                <h2 className="text-subheadline mb-6">About This Project</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-10">{hardcoded.description}</p>
                <h3 className="font-serif text-xl mb-4">Project Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {hardcoded.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            </div>
            <div>
              <AnimatedSection delay={0.2} className="bg-secondary p-8 sticky top-32">
                <h3 className="text-label text-accent mb-6">Project Details</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                      <p className="font-serif text-lg">{hardcoded.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Calendar size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Year</p>
                      <p className="font-serif text-lg">{hardcoded.year}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Maximize size={20} className="text-accent mt-0.5" />
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Area</p>
                      <p className="font-serif text-lg">{hardcoded.details.area}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Style</p>
                    <p className="font-serif text-lg">{hardcoded.details.style}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Duration</p>
                    <p className="font-serif text-lg">{hardcoded.details.duration}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
