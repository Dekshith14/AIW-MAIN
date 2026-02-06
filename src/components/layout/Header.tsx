 import { useState, useEffect } from "react";
 import { Link, useLocation } from "react-router-dom";
 import { motion, AnimatePresence } from "framer-motion";
 import { Menu, X } from "lucide-react";
 
 const navItems = [
   { name: "Home", path: "/" },
   { name: "About", path: "/about" },
   { name: "Services", path: "/services" },
   { name: "Projects", path: "/projects" },
   { name: "Contact", path: "/contact" },
 ];
 
 const Header = () => {
   const [isScrolled, setIsScrolled] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const location = useLocation();
 
   useEffect(() => {
     const handleScroll = () => {
       setIsScrolled(window.scrollY > 50);
     };
     window.addEventListener("scroll", handleScroll);
     return () => window.removeEventListener("scroll", handleScroll);
   }, []);
 
   useEffect(() => {
     setIsMobileMenuOpen(false);
   }, [location]);
 
   return (
     <>
       <header
         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
           isScrolled
             ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
             : "bg-transparent py-6"
         }`}
       >
         <div className="container mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
           <Link to="/" className="relative z-10">
             <span className="font-serif text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
               AIW
             </span>
             <span className="ml-2 text-xs uppercase tracking-widest text-muted-foreground hidden sm:inline">
               Construction & Design
             </span>
           </Link>
 
           {/* Desktop Navigation */}
           <nav className="hidden lg:flex items-center gap-10">
             {navItems.map((item) => (
               <Link
                 key={item.path}
                 to={item.path}
                 className={`text-sm uppercase tracking-widest transition-colors duration-300 link-underline ${
                   location.pathname === item.path
                     ? "text-accent"
                     : "text-muted-foreground hover:text-foreground"
                 }`}
               >
                 {item.name}
               </Link>
             ))}
              <Link to="/request-quote" className="btn-primary ml-4">
                Get Quote
              </Link>
           </nav>
 
           {/* Mobile Menu Button */}
           <button
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="lg:hidden relative z-10 p-2 text-foreground"
             aria-label="Toggle menu"
           >
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
           </button>
         </div>
       </header>
 
       {/* Mobile Menu */}
       <AnimatePresence>
         {isMobileMenuOpen && (
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             transition={{ duration: 0.3 }}
             className="fixed inset-0 z-40 bg-background pt-24 px-6"
           >
             <nav className="flex flex-col items-center gap-8 pt-12">
               {navItems.map((item, index) => (
                 <motion.div
                   key={item.path}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: index * 0.1 }}
                 >
                   <Link
                     to={item.path}
                     className={`font-serif text-3xl transition-colors ${
                       location.pathname === item.path
                         ? "text-accent"
                         : "text-foreground"
                     }`}
                   >
                     {item.name}
                   </Link>
                 </motion.div>
               ))}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
               >
                  <Link to="/request-quote" className="btn-gold mt-8">
                    Get Quote
                  </Link>
               </motion.div>
             </nav>
           </motion.div>
         )}
       </AnimatePresence>
     </>
   );
 };
 
 export default Header;