 import Layout from "@/components/layout/Layout";
 import AnimatedSection from "@/components/ui/AnimatedSection";
 import { Link } from "react-router-dom";
 import { ArrowRight, Building2, Palette, RefreshCcw, Key, Ruler, Compass } from "lucide-react";
 
 const services = [
   {
     icon: Building2,
     title: "Construction Solutions",
     description:
       "From ground-breaking to final finishing, we deliver premium construction services with unwavering attention to quality and timelines.",
     features: [
       "Residential Construction",
       "Commercial Buildings",
       "Industrial Facilities",
       "Infrastructure Projects",
     ],
   },
   {
     icon: Palette,
     title: "Interior Design",
     description:
       "Our award-winning interior design team creates spaces that seamlessly blend aesthetics with functionality, tailored to your lifestyle.",
     features: [
       "Space Planning",
       "Furniture Selection",
       "Material Sourcing",
       "Lighting Design",
     ],
   },
   {
     icon: Key,
     title: "Turnkey Projects",
     description:
       "Experience hassle-free project delivery with our comprehensive turnkey solutions, from conception to completion.",
     features: [
       "End-to-End Management",
       "Single Point of Contact",
       "Quality Assurance",
       "On-Time Delivery",
     ],
   },
   {
     icon: RefreshCcw,
     title: "Renovation & Remodeling",
     description:
       "Transform existing spaces with our expert renovation services, breathing new life into structures while preserving their character.",
     features: [
       "Structural Renovations",
       "Kitchen & Bath Remodels",
       "Historic Restoration",
       "Space Reconfiguration",
     ],
   },
   {
     icon: Ruler,
     title: "Custom Architecture",
     description:
       "Bespoke architectural solutions that push boundaries while honoring your vision and the environment.",
     features: [
       "Custom Home Design",
       "Commercial Architecture",
       "Sustainable Design",
       "3D Visualization",
     ],
   },
   {
     icon: Compass,
     title: "Project Consultation",
     description:
       "Expert guidance and strategic planning to help you navigate complex construction and design decisions.",
     features: [
       "Feasibility Studies",
       "Budget Planning",
       "Timeline Development",
       "Vendor Selection",
     ],
   },
 ];
 
 const Services = () => {
   return (
     <Layout>
       {/* Hero */}
       <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary">
         <div className="container mx-auto px-6 md:px-12 lg:px-20">
           <AnimatedSection className="max-w-3xl">
             <span className="text-label text-accent">Our Expertise</span>
             <h1 className="text-display mt-4 mb-6">Services</h1>
             <p className="text-body-large">
               Comprehensive construction and design services tailored to bring your
               vision to life with precision and artistry.
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
 
       {/* Process */}
       <section className="section-padding bg-secondary">
         <div className="container mx-auto">
           <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
             <span className="text-label text-accent">How We Work</span>
             <h2 className="text-headline mt-3">Our Process</h2>
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
               Ready to Start Your Project?
             </h2>
             <p className="text-lg text-stone max-w-xl mx-auto mb-10">
               Let's discuss how we can bring your vision to life. Contact us for a
               free consultation.
             </p>
             <Link to="/contact" className="btn-gold inline-flex items-center gap-2 group">
               Get Free Consultation
               <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
             </Link>
           </AnimatedSection>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Services;