 import { Link } from "react-router-dom";
 import { ArrowUpRight, Building2, Palette, RefreshCcw, Key, Ruler } from "lucide-react";
 import AnimatedSection from "@/components/ui/AnimatedSection";
 
 const services = [
   {
     icon: Building2,
     title: "Construction",
     description: "Premium construction solutions from concept to completion with meticulous attention to detail.",
   },
   {
     icon: Palette,
     title: "Interior Design",
     description: "Sophisticated interior spaces that blend aesthetics with functionality.",
   },
   {
     icon: Key,
     title: "Turnkey Projects",
     description: "Complete end-to-end project management for seamless delivery.",
   },
   {
     icon: RefreshCcw,
     title: "Renovation",
     description: "Transformative renovations that breathe new life into existing spaces.",
   },
   {
     icon: Ruler,
     title: "Custom Architecture",
     description: "Bespoke architectural solutions tailored to your unique vision.",
   },
 ];
 
 const ServicesPreview = () => {
   return (
     <section className="section-padding bg-secondary">
       <div className="container mx-auto">
         <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
           <div>
             <span className="text-label text-accent">What We Do</span>
             <h2 className="text-headline mt-3">Our Services</h2>
           </div>
           <Link
             to="/services"
             className="link-underline text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
           >
             View All Services
             <ArrowUpRight size={16} />
           </Link>
         </AnimatedSection>
 
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {services.map((service, index) => (
             <AnimatedSection
               key={service.title}
               delay={index * 0.1}
               className="group bg-card p-8 md:p-10 card-hover cursor-pointer"
             >
               <div className="w-14 h-14 rounded-sm bg-muted flex items-center justify-center mb-6 transition-colors group-hover:bg-accent/20">
                 <service.icon size={24} className="text-accent" />
               </div>
               <h3 className="font-serif text-xl md:text-2xl mb-3">{service.title}</h3>
               <p className="text-muted-foreground leading-relaxed">{service.description}</p>
             </AnimatedSection>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default ServicesPreview;