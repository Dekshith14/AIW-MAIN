import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "@/components/layout/Layout";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send, CheckCircle } from "lucide-react";

const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20, "Phone number is too long"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  location: z.string().trim().min(2, "Please enter a location").max(200, "Location is too long"),
  message: z.string().trim().min(10, "Please provide more details about your project").max(2000, "Message is too long"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const projectTypes = [
  // Commercial
  { group: "Commercial", label: "Commercial - Hospitality (Hotels & Lodging)" },
  { group: "Commercial", label: "Commercial - Healthcare (Hospitals & Clinics)" },
  { group: "Commercial", label: "Commercial - Institutions (Schools & Colleges)" },
  { group: "Commercial", label: "Commercial - Corporate & IT Offices" },
  { group: "Commercial", label: "Commercial - Retail Spaces" },
  // Residential
  { group: "Residential", label: "Residential - Apartments & Flats" },
  { group: "Residential", label: "Residential - Villas & Independent Houses" },
  // Services
  { group: "Services", label: "Specialized Interiors" },
  { group: "Services", label: "Civil & MEP Services" },
  { group: "Services", label: "Turnkey Project" },
  { group: "Services", label: "Workshop & Furniture Manufacturing" },
  { group: "Services", label: "Architectural Design & CAD" },
  { group: "Services", label: "Project Consultation" },
];

const budgetRanges = [
  "Under ₹50 Lakhs",
  "₹50 Lakhs - ₹1 Crore",
  "₹1 Crore - ₹5 Crore",
  "₹5 Crore - ₹10 Crore",
  "Above ₹10 Crore",
  "Not Sure / To Be Discussed",
];

const RequestQuote = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      location: "",
      message: "",
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    console.log("Quote request submitted:", data);
    toast.success("Quote request submitted successfully! We'll contact you within 24 hours.");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen flex items-center">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <AnimatedSection className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle size={40} className="text-accent" />
              </div>
              <h1 className="text-headline mb-6">Thank You!</h1>
              <p className="text-body-large mb-8">
                Your quote request has been submitted successfully. Our team will review your requirements and get back to you within 24 hours.
              </p>
              <a href="/" className="btn-gold inline-flex items-center gap-2">
                Back to Home
              </a>
            </AnimatedSection>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-secondary">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <AnimatedSection className="max-w-3xl">
            <span className="text-label text-accent">Get Started</span>
            <h1 className="text-display mt-4 mb-6">Request a Quote</h1>
            <p className="text-body-large">
              Tell us about your project and we'll provide a customized quote tailored to your needs. Our experts will get back to you within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Form */}
            <AnimatedSection className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                            Full Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              className="bg-secondary border-border focus:border-accent h-14"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                            Email Address *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              className="bg-secondary border-border focus:border-accent h-14"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                            Phone Number *
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+91 98765 43210"
                              className="bg-secondary border-border focus:border-accent h-14"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                            Project Location *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City, State"
                              className="bg-secondary border-border focus:border-accent h-14"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                            Project Type *
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-secondary border-border focus:border-accent h-14">
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Commercial</div>
                              {projectTypes.filter(t => t.group === "Commercial").map((type) => (
                                <SelectItem key={type.label} value={type.label}>
                                  {type.label.replace("Commercial - ", "")}
                                </SelectItem>
                              ))}
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t mt-1 pt-2">Residential</div>
                              {projectTypes.filter(t => t.group === "Residential").map((type) => (
                                <SelectItem key={type.label} value={type.label}>
                                  {type.label.replace("Residential - ", "")}
                                </SelectItem>
                              ))}
                              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-t mt-1 pt-2">Services</div>
                              {projectTypes.filter(t => t.group === "Services").map((type) => (
                                <SelectItem key={type.label} value={type.label}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                            Estimated Budget
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-secondary border-border focus:border-accent h-14">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {budgetRanges.map((range) => (
                                <SelectItem key={range} value={range}>
                                  {range}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm uppercase tracking-wider text-muted-foreground">
                          Project Details *
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                            className="bg-secondary border-border focus:border-accent min-h-[160px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    className="btn-gold w-full md:w-auto inline-flex items-center justify-center gap-2 group"
                  >
                    Submit Request
                    <Send size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </Form>
            </AnimatedSection>

            {/* Sidebar */}
            <AnimatedSection delay={0.2}>
              <div className="bg-secondary p-8 md:p-10">
                <h3 className="font-serif text-2xl mb-6">Why Choose AIW?</h3>
                <ul className="space-y-4">
                  {[
                    "12+ years of industry experience",
                    "100+ successful projects completed",
                    "50+ skilled professionals",
                    "Transparent pricing & timelines",
                    "Quality materials & craftsmanship",
                    "Offices in Karnataka, TN & Telangana",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-accent mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Prefer to talk directly?
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="font-serif text-xl text-foreground hover:text-accent transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RequestQuote;
