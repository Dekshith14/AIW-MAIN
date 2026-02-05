 import { motion, useInView } from "framer-motion";
 import { useRef, ReactNode } from "react";
 
 interface AnimatedSectionProps {
   children: ReactNode;
   className?: string;
   delay?: number;
   direction?: "up" | "down" | "left" | "right" | "none";
 }
 
 const AnimatedSection = ({
   children,
   className = "",
   delay = 0,
   direction = "up",
 }: AnimatedSectionProps) => {
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true, margin: "-100px" });
 
   const directions = {
     up: { y: 40, x: 0 },
     down: { y: -40, x: 0 },
     left: { y: 0, x: 40 },
     right: { y: 0, x: -40 },
     none: { y: 0, x: 0 },
   };
 
   return (
     <motion.div
       ref={ref}
       initial={{
         opacity: 0,
         ...directions[direction],
       }}
       animate={
         isInView
           ? { opacity: 1, y: 0, x: 0 }
           : { opacity: 0, ...directions[direction] }
       }
       transition={{
         duration: 0.8,
         delay: delay,
         ease: [0.16, 1, 0.3, 1],
       }}
       className={className}
     >
       {children}
     </motion.div>
   );
 };
 
 export default AnimatedSection;