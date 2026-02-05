 import Layout from "@/components/layout/Layout";
 import AnimatedSection from "@/components/ui/AnimatedSection";
 import { Award, Users, Target, Lightbulb } from "lucide-react";
 import aboutHero from "@/assets/about-hero.jpg";
 import teamCeo from "@/assets/team-ceo.jpg";
 
 const values = [
   {
     icon: Award,
     title: "Excellence",
     description: "We pursue perfection in every project, ensuring exceptional quality and craftsmanship.",
   },
   {
     icon: Lightbulb,
     title: "Innovation",
     description: "We embrace cutting-edge techniques and sustainable practices in our work.",
   },
   {
     icon: Users,
     title: "Collaboration",
     description: "We work closely with clients to bring their unique visions to life.",
   },
   {
     icon: Target,
     title: "Precision",
     description: "We approach every detail with meticulous attention and care.",
   },
 ];
 
 const About = () => {
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
             <span className="text-label text-gold-light">About Us</span>
             <h1 className="text-display text-primary-foreground mt-4">
               Our Story
             </h1>
           </AnimatedSection>
         </div>
       </section>
 
       {/* Story */}
       <section className="section-padding">
         <div className="container mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             <AnimatedSection>
               <span className="text-label text-accent">Who We Are</span>
               <h2 className="text-headline mt-3 mb-6">
                 Building Dreams Since 2006
               </h2>
               <div className="space-y-6 text-muted-foreground leading-relaxed">
                 <p>
                   AIW was founded with a singular vision: to redefine the standards of
                   construction and interior design. What began as a small studio has
                   grown into a full-service firm known for delivering exceptional
                   projects across residential, commercial, and hospitality sectors.
                 </p>
                 <p>
                   Our approach combines architectural innovation with timeless design
                   principles. We believe that every space tells a story, and our role
                   is to help our clients articulate theirs through thoughtful,
                   purposeful design.
                 </p>
                 <p>
                   Today, AIW stands as a testament to the power of vision, dedication,
                   and the relentless pursuit of excellence. Our portfolio spans
                   continents, but our commitment to each client remains deeply
                   personal.
                 </p>
               </div>
             </AnimatedSection>
 
             <AnimatedSection delay={0.2} direction="right">
               <div className="relative">
                 <img
                   src={teamCeo}
                   alt="AIW Leadership"
                   className="w-full aspect-[4/5] object-cover"
                 />
                 <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6">
                   <p className="font-serif text-lg">Alexander Wright</p>
                   <p className="text-xs uppercase tracking-widest mt-1 opacity-80">
                     Founder & Principal Architect
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
               <h3 className="text-subheadline mb-4">Our Vision</h3>
               <p className="text-muted-foreground leading-relaxed">
                 To be the foremost authority in creating spaces that inspire,
                 function beautifully, and stand the test of time. We envision a world
                 where every built environment enhances the lives of those who
                 inhabit it.
               </p>
             </AnimatedSection>
 
             <AnimatedSection delay={0.15} className="bg-card p-10 md:p-12">
               <div className="gold-line mb-6" />
               <h3 className="text-subheadline mb-4">Our Mission</h3>
               <p className="text-muted-foreground leading-relaxed">
                 To deliver unparalleled construction and design solutions through
                 innovation, craftsmanship, and unwavering commitment to our clients'
                 visions. We transform ambitious ideas into tangible realities.
               </p>
             </AnimatedSection>
           </div>
         </div>
       </section>
 
       {/* Values */}
       <section className="section-padding">
         <div className="container mx-auto">
           <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
             <span className="text-label text-accent">Our Values</span>
             <h2 className="text-headline mt-3">What Drives Us</h2>
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
               { value: "250+", label: "Projects Delivered" },
               { value: "18", label: "Years Experience" },
               { value: "45+", label: "Design Awards" },
               { value: "35", label: "Team Members" },
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