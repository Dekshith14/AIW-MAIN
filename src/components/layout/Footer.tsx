 import { Link } from "react-router-dom";
 import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
 
 const Footer = () => {
   return (
     <footer className="bg-charcoal text-primary-foreground">
       <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
           {/* Brand */}
           <div className="lg:col-span-1">
             <Link to="/" className="inline-block">
               <span className="font-serif text-3xl font-semibold tracking-tight">
                 AIW
               </span>
             </Link>
             <p className="mt-4 text-sm text-stone leading-relaxed">
               Building spaces that inspire. Premium construction and interior design
               solutions for discerning clients.
             </p>
             <div className="flex gap-4 mt-6">
               <a
                 href="#"
                 className="w-10 h-10 rounded-full border border-stone/30 flex items-center justify-center transition-colors hover:border-gold hover:text-gold"
                 aria-label="Instagram"
               >
                 <Instagram size={18} />
               </a>
               <a
                 href="#"
                 className="w-10 h-10 rounded-full border border-stone/30 flex items-center justify-center transition-colors hover:border-gold hover:text-gold"
                 aria-label="LinkedIn"
               >
                 <Linkedin size={18} />
               </a>
               <a
                 href="#"
                 className="w-10 h-10 rounded-full border border-stone/30 flex items-center justify-center transition-colors hover:border-gold hover:text-gold"
                 aria-label="Facebook"
               >
                 <Facebook size={18} />
               </a>
             </div>
           </div>
 
           {/* Quick Links */}
           <div>
             <h4 className="text-label text-gold-light mb-6">Navigation</h4>
             <ul className="space-y-3">
               {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
                 <li key={item}>
                   <Link
                     to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                     className="text-stone hover:text-primary-foreground transition-colors"
                   >
                     {item}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Services */}
           <div>
             <h4 className="text-label text-gold-light mb-6">Services</h4>
             <ul className="space-y-3">
               {[
                 "Construction",
                 "Interior Design",
                 "Renovation",
                 "Turnkey Projects",
                 "Consultation",
               ].map((item) => (
                 <li key={item}>
                   <Link
                     to="/services"
                     className="text-stone hover:text-primary-foreground transition-colors"
                   >
                     {item}
                   </Link>
                 </li>
               ))}
             </ul>
           </div>
 
           {/* Contact */}
           <div>
             <h4 className="text-label text-gold-light mb-6">Contact</h4>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                 <MapPin size={18} className="text-gold mt-0.5 flex-shrink-0" />
                 <span className="text-stone text-sm">
                   123 Architecture Avenue
                   <br />
                   Design District, NY 10001
                 </span>
               </li>
               <li className="flex items-center gap-3">
                 <Phone size={18} className="text-gold flex-shrink-0" />
                 <a href="tel:+1234567890" className="text-stone hover:text-primary-foreground transition-colors text-sm">
                   +1 (234) 567-890
                 </a>
               </li>
               <li className="flex items-center gap-3">
                 <Mail size={18} className="text-gold flex-shrink-0" />
                 <a href="mailto:hello@aiw.com" className="text-stone hover:text-primary-foreground transition-colors text-sm">
                   hello@aiw.com
                 </a>
               </li>
             </ul>
           </div>
         </div>
 
         {/* Bottom */}
         <div className="mt-16 pt-8 border-t border-charcoal-light">
           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-stone text-sm">
               © {new Date().getFullYear()} AIW Construction & Design. All rights reserved.
             </p>
             <div className="flex gap-6 text-sm text-stone">
               <a href="#" className="hover:text-primary-foreground transition-colors">
                 Privacy Policy
               </a>
               <a href="#" className="hover:text-primary-foreground transition-colors">
                 Terms of Service
               </a>
             </div>
           </div>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;