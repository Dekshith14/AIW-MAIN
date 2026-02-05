 import { motion } from "framer-motion";
 import { Link } from "react-router-dom";
 import { ArrowRight } from "lucide-react";
 import heroImage from "@/assets/hero-interior.jpg";
 
 const HeroSection = () => {
   return (
     <section className="relative min-h-screen flex items-center overflow-hidden">
       {/* Background Image */}
       <div className="absolute inset-0">
         <motion.img
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           src={heroImage}
           alt="Luxury interior design"
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/90 via-charcoal-dark/60 to-transparent" />
       </div>
 
       {/* Content */}
       <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 pt-20">
         <div className="max-w-3xl">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex items-center gap-4 mb-6"
           >
             <div className="gold-line" />
             <span className="text-label text-gold-light">
               Premium Construction & Interior Design
             </span>
           </motion.div>
 
           <motion.h1
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="text-display text-primary-foreground mb-6"
           >
             Building Spaces
             <br />
             <span className="text-gold">Intelligently</span>
           </motion.h1>
 
           <motion.p
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="text-lg md:text-xl text-stone max-w-xl mb-10 leading-relaxed"
           >
             We craft exceptional living and working environments through innovative
             construction and inspired interior design.
           </motion.p>
 
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="flex flex-wrap gap-4"
           >
             <Link to="/projects" className="btn-gold group inline-flex items-center gap-2">
               View Projects
               <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
             </Link>
             <Link to="/contact" className="border border-stone/40 text-primary-foreground px-8 py-4 font-sans text-sm uppercase tracking-widest transition-all duration-300 hover:border-gold hover:text-gold">
               Get Consultation
             </Link>
           </motion.div>
         </div>
       </div>
 
       {/* Scroll Indicator */}
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 1.5 }}
         className="absolute bottom-12 left-1/2 -translate-x-1/2"
       >
         <div className="flex flex-col items-center gap-2">
           <span className="text-xs uppercase tracking-widest text-stone/70">Scroll</span>
           <motion.div
             animate={{ y: [0, 8, 0] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="w-px h-12 bg-gradient-to-b from-gold to-transparent"
           />
         </div>
       </motion.div>
     </section>
   );
 };
 
 export default HeroSection;