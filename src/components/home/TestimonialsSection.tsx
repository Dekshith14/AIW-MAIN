 import { useState } from "react";
 import { motion, AnimatePresence } from "framer-motion";
 import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
 import AnimatedSection from "@/components/ui/AnimatedSection";
 
 const testimonials = [
   {
     id: 1,
     quote:
       "AIW transformed our vision into reality. Their attention to detail and innovative approach exceeded all expectations. The space they created truly reflects our lifestyle.",
     author: "Sarah Mitchell",
     role: "Homeowner, Serenity Villa",
   },
   {
     id: 2,
     quote:
       "Working with AIW was a seamless experience. Their professionalism and design expertise made our office renovation stress-free and the results speak for themselves.",
     author: "James Chen",
     role: "CEO, TechStart Inc.",
   },
   {
     id: 3,
     quote:
       "The team's understanding of luxury hospitality design is unmatched. They delivered a boutique hotel that guests consistently rave about.",
     author: "Elena Rodriguez",
     role: "Director, Lumiere Hotels",
   },
 ];
 
 const TestimonialsSection = () => {
   const [current, setCurrent] = useState(0);
 
   const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
   const prev = () =>
     setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
 
   return (
     <section className="section-padding bg-charcoal text-primary-foreground overflow-hidden">
       <div className="container mx-auto">
         <AnimatedSection className="max-w-4xl mx-auto text-center">
           <Quote size={48} className="text-gold mx-auto mb-8 opacity-50" />
 
           <div className="relative min-h-[280px] md:min-h-[200px]">
             <AnimatePresence mode="wait">
               <motion.div
                 key={current}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 transition={{ duration: 0.5 }}
               >
                 <blockquote className="font-serif text-2xl md:text-3xl font-light leading-relaxed text-stone mb-8">
                   "{testimonials[current].quote}"
                 </blockquote>
                 <div>
                   <p className="font-serif text-xl text-primary-foreground">
                     {testimonials[current].author}
                   </p>
                   <p className="text-label text-gold-light mt-2">
                     {testimonials[current].role}
                   </p>
                 </div>
               </motion.div>
             </AnimatePresence>
           </div>
 
           <div className="flex items-center justify-center gap-4 mt-12">
             <button
               onClick={prev}
               className="w-12 h-12 rounded-full border border-stone/30 flex items-center justify-center transition-colors hover:border-gold hover:text-gold"
               aria-label="Previous testimonial"
             >
               <ChevronLeft size={20} />
             </button>
             <div className="flex gap-2">
               {testimonials.map((_, index) => (
                 <button
                   key={index}
                   onClick={() => setCurrent(index)}
                   className={`w-2 h-2 rounded-full transition-colors ${
                     index === current ? "bg-gold" : "bg-stone/30"
                   }`}
                   aria-label={`Go to testimonial ${index + 1}`}
                 />
               ))}
             </div>
             <button
               onClick={next}
               className="w-12 h-12 rounded-full border border-stone/30 flex items-center justify-center transition-colors hover:border-gold hover:text-gold"
               aria-label="Next testimonial"
             >
               <ChevronRight size={20} />
             </button>
           </div>
         </AnimatedSection>
       </div>
     </section>
   );
 };
 
 export default TestimonialsSection;