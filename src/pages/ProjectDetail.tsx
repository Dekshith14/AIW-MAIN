 import { useParams, Link } from "react-router-dom";
 import Layout from "@/components/layout/Layout";
 import AnimatedSection from "@/components/ui/AnimatedSection";
 import { getProjectBySlug, projects } from "@/data/projects";
 import { ArrowLeft, ArrowRight, MapPin, Calendar, Maximize } from "lucide-react";
 
 const ProjectDetail = () => {
   const { slug } = useParams();
   const project = getProjectBySlug(slug || "");
 
   if (!project) {
     return (
       <Layout>
         <div className="section-padding text-center">
           <h1 className="text-headline mb-4">Project Not Found</h1>
           <Link to="/projects" className="btn-primary">
             Back to Projects
           </Link>
         </div>
       </Layout>
     );
   }
 
   const currentIndex = projects.findIndex((p) => p.id === project.id);
   const prevProject = projects[currentIndex - 1];
   const nextProject = projects[currentIndex + 1];
 
   return (
     <Layout>
       {/* Hero */}
       <section className="relative h-[70vh] md:h-[80vh]">
         <img
           src={project.image}
           alt={project.title}
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/80 via-charcoal-dark/30 to-transparent" />
         <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20">
          <div className="container mx-auto">
              <AnimatedSection>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-label text-gold-light">{project.category.main}</span>
                  <span className="text-gold-light/50">•</span>
                  <span className="text-label text-stone">{project.category.sub}</span>
                </div>
                <h1 className="text-display text-primary-foreground mt-4">
                  {project.title}
                </h1>
              </AnimatedSection>
            </div>
         </div>
       </section>
 
       {/* Details */}
       <section className="section-padding">
         <div className="container mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
             {/* Main Content */}
             <div className="lg:col-span-2">
               <AnimatedSection>
                 <h2 className="text-subheadline mb-6">About This Project</h2>
                 <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                   {project.description}
                 </p>
 
                 <h3 className="font-serif text-xl mb-4">Project Highlights</h3>
                 <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                   {project.highlights.map((highlight) => (
                     <li
                       key={highlight}
                       className="flex items-center gap-3 text-muted-foreground"
                     >
                       <span className="w-2 h-2 rounded-full bg-accent" />
                       {highlight}
                     </li>
                   ))}
                 </ul>
               </AnimatedSection>
             </div>
 
             {/* Sidebar */}
             <div>
               <AnimatedSection delay={0.2} className="bg-secondary p-8 sticky top-32">
                 <h3 className="text-label text-accent mb-6">Project Details</h3>
                 <div className="space-y-6">
                   <div className="flex items-start gap-4">
                     <MapPin size={20} className="text-accent mt-0.5" />
                     <div>
                       <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                         Location
                       </p>
                       <p className="font-serif text-lg">{project.location}</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-4">
                     <Calendar size={20} className="text-accent mt-0.5" />
                     <div>
                       <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                         Year
                       </p>
                       <p className="font-serif text-lg">{project.year}</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-4">
                     <Maximize size={20} className="text-accent mt-0.5" />
                     <div>
                       <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                         Area
                       </p>
                       <p className="font-serif text-lg">{project.details.area}</p>
                     </div>
                   </div>
                   <div className="pt-6 border-t border-border">
                     <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                       Style
                     </p>
                     <p className="font-serif text-lg">{project.details.style}</p>
                   </div>
                   <div>
                     <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                       Duration
                     </p>
                     <p className="font-serif text-lg">{project.details.duration}</p>
                   </div>
                 </div>
               </AnimatedSection>
             </div>
           </div>
         </div>
       </section>
 
       {/* Navigation */}
       <section className="border-t border-border">
         <div className="container mx-auto px-6 md:px-12 lg:px-20">
           <div className="grid grid-cols-2">
             {prevProject ? (
               <Link
                 to={`/projects/${prevProject.slug}`}
                 className="py-8 md:py-12 group flex items-center gap-4 border-r border-border pr-6"
               >
                 <ArrowLeft
                   size={20}
                   className="transition-transform group-hover:-translate-x-2"
                 />
                 <div>
                   <p className="text-label text-muted-foreground">Previous</p>
                   <p className="font-serif text-lg md:text-xl group-hover:text-accent transition-colors">
                     {prevProject.title}
                   </p>
                 </div>
               </Link>
             ) : (
               <div />
             )}
             {nextProject ? (
               <Link
                 to={`/projects/${nextProject.slug}`}
                 className="py-8 md:py-12 group flex items-center justify-end gap-4 pl-6 text-right"
               >
                 <div>
                   <p className="text-label text-muted-foreground">Next</p>
                   <p className="font-serif text-lg md:text-xl group-hover:text-accent transition-colors">
                     {nextProject.title}
                   </p>
                 </div>
                 <ArrowRight
                   size={20}
                   className="transition-transform group-hover:translate-x-2"
                 />
               </Link>
             ) : (
               <div />
             )}
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default ProjectDetail;