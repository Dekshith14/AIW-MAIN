 import { Link } from "react-router-dom";
 import { ArrowRight } from "lucide-react";
 import AnimatedSection from "@/components/ui/AnimatedSection";
 
 const CTASection = () => {
   return (
     <section className="section-padding">
       <div className="container mx-auto">
         <AnimatedSection className="relative bg-muted p-10 md:p-20 text-center overflow-hidden">
           {/* Decorative elements */}
           <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-accent/20" />
           <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-accent/20" />
 
           <span className="text-label text-accent">Start Your Project</span>
           <h2 className="text-headline mt-4 mb-6">
             Ready to Transform
             <br />
             Your Space?
           </h2>
           <p className="text-body-large max-w-2xl mx-auto mb-10">
             Let's discuss your vision and create something extraordinary together. Our
             team is ready to bring your dream project to life.
           </p>
            <Link
              to="/request-quote"
              className="btn-gold inline-flex items-center gap-2 group"
            >
              Get Your Free Consultation
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
         </AnimatedSection>
       </div>
     </section>
   );
 };
 
 export default CTASection;