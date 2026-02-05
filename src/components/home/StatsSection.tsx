 import AnimatedSection from "@/components/ui/AnimatedSection";
 import { motion, useInView } from "framer-motion";
 import { useRef, useEffect, useState } from "react";
 
 const stats = [
   { value: 250, suffix: "+", label: "Projects Completed" },
   { value: 18, suffix: "", label: "Years of Excellence" },
   { value: 45, suffix: "+", label: "Design Awards" },
   { value: 98, suffix: "%", label: "Client Satisfaction" },
 ];
 
 const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
   const [count, setCount] = useState(0);
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true });
 
   useEffect(() => {
     if (isInView) {
       const duration = 2000;
       const steps = 60;
       const increment = value / steps;
       let current = 0;
       const timer = setInterval(() => {
         current += increment;
         if (current >= value) {
           setCount(value);
           clearInterval(timer);
         } else {
           setCount(Math.floor(current));
         }
       }, duration / steps);
       return () => clearInterval(timer);
     }
   }, [isInView, value]);
 
   return (
     <span ref={ref} className="text-5xl md:text-7xl font-serif font-light text-foreground">
       {count}
       {suffix}
     </span>
   );
 };
 
 const StatsSection = () => {
   return (
     <section className="py-20 md:py-28 bg-muted">
       <div className="container mx-auto px-6 md:px-12 lg:px-20">
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
           {stats.map((stat, index) => (
             <AnimatedSection
               key={stat.label}
               delay={index * 0.1}
               className="text-center"
             >
               <CountUp value={stat.value} suffix={stat.suffix} />
               <p className="text-label text-muted-foreground mt-4">{stat.label}</p>
             </AnimatedSection>
           ))}
         </div>
       </div>
     </section>
   );
 };
 
 export default StatsSection;