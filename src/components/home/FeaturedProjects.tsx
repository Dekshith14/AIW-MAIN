 import { Link } from "react-router-dom";
 import { ArrowUpRight } from "lucide-react";
 import AnimatedSection from "@/components/ui/AnimatedSection";
 import projectResidential from "@/assets/project-residential.jpg";
 import projectCommercial from "@/assets/project-commercial.jpg";
 import projectInterior from "@/assets/project-interior.jpg";
 
 const projects = [
   {
     id: 1,
     title: "Serenity Villa",
     category: "Residential",
     image: projectResidential,
     location: "Beverly Hills, CA",
   },
   {
     id: 2,
     title: "Nexus Office Complex",
     category: "Commercial",
     image: projectCommercial,
     location: "Manhattan, NY",
   },
   {
     id: 3,
     title: "The Haven Suite",
     category: "Interior Design",
     image: projectInterior,
     location: "Miami, FL",
   },
 ];
 
 const FeaturedProjects = () => {
   return (
     <section className="section-padding">
       <div className="container mx-auto">
         <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
           <div>
             <span className="text-label text-accent">Portfolio</span>
             <h2 className="text-headline mt-3">Featured Projects</h2>
           </div>
           <Link
             to="/projects"
             className="link-underline text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
           >
             View All Projects
             <ArrowUpRight size={16} />
           </Link>
         </AnimatedSection>
 
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {projects.map((project, index) => (
             <AnimatedSection
               key={project.id}
               delay={index * 0.15}
               className="group relative overflow-hidden cursor-pointer"
             >
               <Link to="/projects">
                 <div className="aspect-[4/5] overflow-hidden">
                   <img
                     src={project.image}
                     alt={project.title}
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                 <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                   <span className="text-label text-gold-light">{project.category}</span>
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
       </div>
     </section>
   );
 };
 
 export default FeaturedProjects;