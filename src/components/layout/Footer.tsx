import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react";
import { useSiteContent } from "@/hooks/usePublicData";

const Footer = () => {
  const { data: content } = useSiteContent("footer");
  const address = (content?.["contact.address"] || "#47/1, Kanakashree Layout,\nDr. S.R.K. Nagar Post, Byrathi,\nBangalore – 560 077, Karnataka, India").split("\n");

  return (
    <footer className="bg-atmosphere-dark text-primary-foreground relative">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-3xl tracking-tight transition-colors duration-500 group-hover:text-accent">
                AIW
              </span>
            </Link>
            <p className="mt-5 text-sm text-stone leading-[1.8] font-light">
              {content?.["brand.description"] ||
                "Specialized interiors, civil & MEP services. Complete solution under one roof. Offices in Karnataka, Tamil Nadu & Telangana."}
            </p>
            <div className="flex gap-3 mt-8">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 rounded-full border border-stone/20 flex items-center justify-center transition-all duration-500 hover:border-accent hover:text-accent hover:scale-105"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label text-gold-light mb-8">{content?.["navigation.title"] || "Navigation"}</h4>
            <ul className="space-y-4">
              {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-stone text-sm hover:text-primary-foreground transition-all duration-500 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-label text-gold-light mb-8">{content?.["services.title"] || "Services"}</h4>
            <ul className="space-y-4">
              {[
                "Specialized Interiors",
                "Civil & MEP Services",
                "Turnkey Projects",
                "Furniture Manufacturing",
                "Project Consultation",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/services"
                    className="text-stone text-sm hover:text-primary-foreground transition-all duration-500 hover:translate-x-1 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label text-gold-light mb-8">{content?.["contact.title"] || "Contact"}</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-stone text-sm leading-relaxed">
                  {address.map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      {index < address.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+919876543210" className="text-stone hover:text-primary-foreground transition-colors duration-500 text-sm">
                  {content?.["contact.phone"] || "+91 98765 43210"}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:info@aiwindia.com" className="text-stone hover:text-primary-foreground transition-colors duration-500 text-sm">
                  {content?.["contact.email"] || "info@aiwindia.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-charcoal-light/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone/60 text-xs tracking-wider">
              © {new Date().getFullYear()} {content?.["legal.copyright"] || "AIW — Specialized Interiors, Civil & MEP Services. All rights reserved."}
            </p>
            <div className="flex gap-8 text-xs text-stone/60 tracking-wider">
              <a href="https://www.aiwindia.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors duration-500">
                {content?.["legal.website"] || "www.aiwindia.com"}
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors duration-500">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
