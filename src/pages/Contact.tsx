 import { useState } from "react";
 import Layout from "@/components/layout/Layout";
 import AnimatedSection from "@/components/ui/AnimatedSection";
 import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
 import { toast } from "sonner";
 
 const Contact = () => {
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     phone: "",
     service: "",
     message: "",
   });
   const [isSubmitting, setIsSubmitting] = useState(false);
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
 
     // Simulate form submission
     await new Promise((resolve) => setTimeout(resolve, 1500));
 
     toast.success("Message sent successfully! We'll be in touch soon.");
     setFormData({ name: "", email: "", phone: "", service: "", message: "" });
     setIsSubmitting(false);
   };
 
   const handleChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
   ) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
 
   return (
     <Layout>
       {/* Hero */}
       <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary">
         <div className="container mx-auto px-6 md:px-12 lg:px-20">
           <AnimatedSection className="max-w-3xl">
             <span className="text-label text-accent">Get In Touch</span>
             <h1 className="text-display mt-4 mb-6">Contact Us</h1>
             <p className="text-body-large">
               Ready to start your project? We'd love to hear from you. Reach out for
               a free consultation.
             </p>
           </AnimatedSection>
         </div>
       </section>
 
       {/* Contact Content */}
       <section className="section-padding">
         <div className="container mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
             {/* Contact Info */}
             <div>
               <AnimatedSection>
                 <h2 className="text-subheadline mb-8">Let's Connect</h2>
                 <div className="space-y-8">
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                       <MapPin size={20} className="text-accent" />
                     </div>
                     <div>
                       <h3 className="font-serif text-lg mb-1">Visit Us</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          #47/1, Kanakashree Layout,
                          <br />
                          Dr. S.R.K. Nagar Post, Byrathi,
                          <br />
                          Bangalore – 560 077, Karnataka, India
                        </p>
                     </div>
                   </div>
 
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                       <Phone size={20} className="text-accent" />
                     </div>
                     <div>
                       <h3 className="font-serif text-lg mb-1">Call Us</h3>
                        <a
                          href="tel:+919876543210"
                          className="text-muted-foreground text-sm hover:text-accent transition-colors"
                        >
                          +91 98765 43210
                        </a>
                     </div>
                   </div>
 
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                       <Mail size={20} className="text-accent" />
                     </div>
                     <div>
                       <h3 className="font-serif text-lg mb-1">Email Us</h3>
                        <a
                          href="mailto:info@aiwindia.com"
                          className="text-muted-foreground text-sm hover:text-accent transition-colors"
                        >
                          info@aiwindia.com
                        </a>
                     </div>
                   </div>
 
                   <div className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-sm bg-muted flex items-center justify-center flex-shrink-0">
                       <Clock size={20} className="text-accent" />
                     </div>
                     <div>
                       <h3 className="font-serif text-lg mb-1">Office Hours</h3>
                       <p className="text-muted-foreground text-sm leading-relaxed">
                         Mon - Fri: 9:00 AM - 6:00 PM
                         <br />
                         Sat: By Appointment
                       </p>
                     </div>
                   </div>
                 </div>
               </AnimatedSection>
             </div>
 
             {/* Contact Form */}
             <div className="lg:col-span-2">
               <AnimatedSection delay={0.2}>
                 <form onSubmit={handleSubmit} className="bg-card p-8 md:p-12">
                   <h2 className="text-subheadline mb-8">Send a Message</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                     <div>
                       <label
                         htmlFor="name"
                         className="text-label block mb-2"
                       >
                         Full Name *
                       </label>
                       <input
                         type="text"
                         id="name"
                         name="name"
                         value={formData.name}
                         onChange={handleChange}
                         required
                         className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                         placeholder="Your name"
                       />
                     </div>
                     <div>
                       <label
                         htmlFor="email"
                         className="text-label block mb-2"
                       >
                         Email Address *
                       </label>
                       <input
                         type="email"
                         id="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         required
                         className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                         placeholder="you@example.com"
                       />
                     </div>
                     <div>
                       <label
                         htmlFor="phone"
                         className="text-label block mb-2"
                       >
                         Phone Number
                       </label>
                       <input
                         type="tel"
                         id="phone"
                         name="phone"
                         value={formData.phone}
                         onChange={handleChange}
                         className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                         placeholder="+91 98765 43210"
                       />
                     </div>
                     <div>
                       <label
                         htmlFor="service"
                         className="text-label block mb-2"
                       >
                         Service Interested In
                       </label>
                       <select
                         id="service"
                         name="service"
                         value={formData.service}
                         onChange={handleChange}
                         className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors"
                       >
                         <option value="">Select a service</option>
                          <option value="interiors">Specialized Interiors</option>
                          <option value="civil-mep">Civil & MEP Services</option>
                          <option value="turnkey">Turnkey Projects</option>
                          <option value="furniture">Workshop & Furniture</option>
                          <option value="design-cad">Architectural Design & CAD</option>
                          <option value="consultation">Project Consultation</option>
                       </select>
                     </div>
                   </div>
                   <div className="mb-8">
                     <label
                       htmlFor="message"
                       className="text-label block mb-2"
                     >
                       Your Message *
                     </label>
                     <textarea
                       id="message"
                       name="message"
                       value={formData.message}
                       onChange={handleChange}
                       required
                       rows={6}
                       className="w-full px-4 py-3 bg-background border border-border focus:border-accent focus:outline-none transition-colors resize-none"
                       placeholder="Tell us about your project..."
                     />
                   </div>
                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="btn-gold inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isSubmitting ? (
                       "Sending..."
                     ) : (
                       <>
                         Send Message
                         <Send size={18} />
                       </>
                     )}
                   </button>
                 </form>
               </AnimatedSection>
             </div>
           </div>
         </div>
       </section>
 
       {/* Map Placeholder */}
       <section className="h-[400px] bg-muted relative">
         <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-center">
             <MapPin size={48} className="mx-auto text-accent mb-4" />
             <p className="text-muted-foreground">Map Integration Placeholder</p>
              <p className="text-sm text-muted-foreground mt-2">
                #47/1, Kanakashree Layout, Byrathi, Bangalore – 560 077
              </p>
           </div>
         </div>
       </section>
     </Layout>
   );
 };
 
 export default Contact;