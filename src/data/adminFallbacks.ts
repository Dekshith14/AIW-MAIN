import { categoryHierarchy, projects as hardcodedProjects } from "@/data/projects";

export interface FallbackProjectRecord {
  id: string;
  title: string;
  slug: string;
  domain: string;
  description: string | null;
  client: string | null;
  location: string | null;
  year: string | null;
  area: string | null;
  duration: string | null;
  style: string | null;
  cover_image: string | null;
  status: string;
  is_featured: boolean;
  featured_order: number | null;
  sort_order: number;
  tags: string[] | null;
  highlights: string[] | null;
  category_id: string | null;
}

export interface FallbackSiteContentItem {
  page: string;
  section: string;
  content_key: string;
  content_value: string;
  content_type: string;
  sort_order: number;
}

export interface FallbackTestimonial {
  id: string;
  author: string;
  quote: string;
  role: string | null;
  is_active: boolean;
  sort_order: number;
}

export interface FallbackCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
}

export const fallbackProjects: FallbackProjectRecord[] = hardcodedProjects.map((project, index) => ({
  id: `fallback-${project.slug}`,
  title: project.title,
  slug: project.slug,
  domain: project.category.sub,
  description: project.description,
  client: null,
  location: project.location,
  year: project.year,
  area: project.details.area,
  duration: project.details.duration,
  style: project.details.style,
  cover_image: project.image,
  status: "published",
  is_featured: index < 3,
  featured_order: index < 3 ? index : null,
  sort_order: index,
  tags: null,
  highlights: project.highlights,
  category_id: null,
}));

const mainCategories: FallbackCategory[] = Object.entries(categoryHierarchy).map(([key, value], index) => ({
  id: `fallback-${key.toLowerCase()}`,
  name: value.label,
  slug: key.toLowerCase(),
  description: `${value.label} projects`,
  parent_id: null,
  sort_order: index,
}));

const subCategories: FallbackCategory[] = Object.entries(categoryHierarchy).flatMap(([key, value], mainIndex) =>
  value.subcategories.map((subcategory, subIndex) => ({
    id: `fallback-${subcategory.key.toLowerCase().replace(/\s+/g, "-")}`,
    name: subcategory.label,
    slug: subcategory.key.toLowerCase().replace(/\s+/g, "-"),
    description: subcategory.description,
    parent_id: `fallback-${key.toLowerCase()}`,
    sort_order: mainIndex * 10 + subIndex,
  })),
);

export const fallbackCategories: FallbackCategory[] = [...mainCategories, ...subCategories];

export const fallbackTestimonials: FallbackTestimonial[] = [
  {
    id: "fallback-testimonial-1",
    quote:
      "AIW delivered stylish interiors for our home that exceeded expectations. Their transparent pricing and on-time completion made the entire experience stress-free.",
    author: "Rajesh Kumar",
    role: "Homeowner, Bangalore",
    is_active: true,
    sort_order: 0,
  },
  {
    id: "fallback-testimonial-2",
    quote:
      "From office design to turnkey execution, AIW handled everything professionally. The quality of materials and finishes is truly outstanding.",
    author: "Priya Sharma",
    role: "Director, Tech Innovations",
    is_active: true,
    sort_order: 1,
  },
  {
    id: "fallback-testimonial-3",
    quote:
      "We trusted AIW with our commercial space renovation and they delivered a durable, beautifully designed environment that our team loves working in.",
    author: "Anand Mehta",
    role: "Facility Head, Corporate Office",
    is_active: true,
    sort_order: 2,
  },
];

export const fallbackSiteContent: FallbackSiteContentItem[] = [
  { page: "homepage", section: "hero", content_key: "eyebrow", content_value: "Interior Design & Construction Experts", content_type: "text", sort_order: 0 },
  { page: "homepage", section: "hero", content_key: "title_line_1", content_value: "Interior Design & Construction", content_type: "text", sort_order: 1 },
  { page: "homepage", section: "hero", content_key: "title_line_2", content_value: "for Modern Spaces", content_type: "text", sort_order: 2 },
  { page: "homepage", section: "hero", content_key: "description", content_value: "Transform your space with our professional interior design and construction services. We deliver complete turnkey solutions for homes, apartments, villas, and offices — from planning and design to construction and finishing.", content_type: "textarea", sort_order: 3 },
  { page: "homepage", section: "hero", content_key: "primary_cta", content_value: "View Projects", content_type: "text", sort_order: 4 },
  { page: "homepage", section: "hero", content_key: "secondary_cta", content_value: "Get Consultation", content_type: "text", sort_order: 5 },
  { page: "homepage", section: "services", content_key: "eyebrow", content_value: "What We Do", content_type: "text", sort_order: 6 },
  { page: "homepage", section: "services", content_key: "title", content_value: "Complete Interior & Construction Solutions", content_type: "text", sort_order: 7 },
  { page: "homepage", section: "testimonials", content_key: "eyebrow", content_value: "Client Testimonials", content_type: "text", sort_order: 8 },
  { page: "homepage", section: "testimonials", content_key: "title", content_value: "Our Clients Trust Us", content_type: "text", sort_order: 9 },
  { page: "homepage", section: "cta", content_key: "eyebrow", content_value: "Get Free Consultation", content_type: "text", sort_order: 10 },
  { page: "homepage", section: "cta", content_key: "title_line_1", content_value: "Planning Your Dream", content_type: "text", sort_order: 11 },
  { page: "homepage", section: "cta", content_key: "title_line_2", content_value: "Home or Office?", content_type: "text", sort_order: 12 },
  { page: "homepage", section: "cta", content_key: "description", content_value: "Talk to our interior and construction experts and receive a free consultation and project estimate. No hidden costs, transparent pricing.", content_type: "textarea", sort_order: 13 },
  { page: "homepage", section: "cta", content_key: "button_label", content_value: "Get Your Free Consultation", content_type: "text", sort_order: 14 },
  { page: "about", section: "hero", content_key: "eyebrow", content_value: "About Us", content_type: "text", sort_order: 0 },
  { page: "about", section: "hero", content_key: "title", content_value: "Our Story", content_type: "text", sort_order: 1 },
  { page: "about", section: "story", content_key: "eyebrow", content_value: "Who We Are", content_type: "text", sort_order: 2 },
  { page: "about", section: "story", content_key: "title", content_value: "Building Spaces Since 2013", content_type: "text", sort_order: 3 },
  { page: "about", section: "story", content_key: "paragraph_1", content_value: "Founded in 2013, AIW is a dynamic specialist organization delivering services across multiple domains. We bring together broad-minded professionals from diverse disciplines and encourage them to think beyond their specialization, driving innovation and excellence.", content_type: "textarea", sort_order: 4 },
  { page: "about", section: "story", content_key: "paragraph_2", content_value: "We maintain a strong competitive edge through efficiency, flexibility, and an unwavering commitment to quality. Our primary focus is on delivering high-quality, cost-effective services that comply with both local and international standards while remaining deeply respectful of the environment.", content_type: "textarea", sort_order: 5 },
  { page: "about", section: "story", content_key: "paragraph_3", content_value: "Today, AIW continues to achieve steady growth and proudly employs nearly 50 skilled professionals. With offices in Tamil Nadu and Telangana, our strong resource base ensures capacity and expertise to deliver projects on time while meeting the highest quality standards.", content_type: "textarea", sort_order: 6 },
  { page: "about", section: "story", content_key: "badge_title", content_value: "Since 2013", content_type: "text", sort_order: 7 },
  { page: "about", section: "story", content_key: "badge_label", content_value: "Interior Contractor of Choice", content_type: "text", sort_order: 8 },
  { page: "about", section: "vision", content_key: "title", content_value: "Our Vision", content_type: "text", sort_order: 9 },
  { page: "about", section: "vision", content_key: "body", content_value: "To be the foremost authority in creating spaces that inspire through competent, timely, and cost-effective solutions. We envision a world where every built environment enhances the lives of those who inhabit it.", content_type: "textarea", sort_order: 10 },
  { page: "about", section: "mission", content_key: "title", content_value: "Our Mission", content_type: "text", sort_order: 11 },
  { page: "about", section: "mission", content_key: "body", content_value: "To deliver high-quality, cost-effective services that comply with both local and international standards while remaining deeply respectful of the environment and prioritizing the health and safety of our workforce.", content_type: "textarea", sort_order: 12 },
  { page: "about", section: "values", content_key: "eyebrow", content_value: "Our Values", content_type: "text", sort_order: 13 },
  { page: "about", section: "values", content_key: "title", content_value: "What Drives Us", content_type: "text", sort_order: 14 },
  { page: "services", section: "hero", content_key: "eyebrow", content_value: "Our Expertise", content_type: "text", sort_order: 0 },
  { page: "services", section: "hero", content_key: "title", content_value: "Services", content_type: "text", sort_order: 1 },
  { page: "services", section: "hero", content_key: "description", content_value: "Comprehensive interiors, civil, and MEP services tailored to bring your vision to life with precision and artistry.", content_type: "textarea", sort_order: 2 },
  { page: "services", section: "markets", content_key: "eyebrow", content_value: "Industries We Serve", content_type: "text", sort_order: 3 },
  { page: "services", section: "markets", content_key: "title", content_value: "Reference Markets", content_type: "text", sort_order: 4 },
  { page: "services", section: "process", content_key: "eyebrow", content_value: "How We Work", content_type: "text", sort_order: 5 },
  { page: "services", section: "process", content_key: "title", content_value: "Our Process", content_type: "text", sort_order: 6 },
  { page: "services", section: "cta", content_key: "title", content_value: "Ready to Start Your Project?", content_type: "text", sort_order: 7 },
  { page: "services", section: "cta", content_key: "description", content_value: "Let's discuss how we can bring your vision to life. Contact us for a free consultation.", content_type: "textarea", sort_order: 8 },
  { page: "services", section: "cta", content_key: "button_label", content_value: "Get Free Consultation", content_type: "text", sort_order: 9 },
  { page: "contact", section: "hero", content_key: "eyebrow", content_value: "Get In Touch", content_type: "text", sort_order: 0 },
  { page: "contact", section: "hero", content_key: "title", content_value: "Contact Us", content_type: "text", sort_order: 1 },
  { page: "contact", section: "hero", content_key: "description", content_value: "Ready to start your project? We'd love to hear from you. Reach out for a free consultation.", content_type: "textarea", sort_order: 2 },
  { page: "contact", section: "info", content_key: "title", content_value: "Let's Connect", content_type: "text", sort_order: 3 },
  { page: "contact", section: "info", content_key: "address", content_value: "#47/1, Kanakashree Layout,\nDr. S.R.K. Nagar Post, Byrathi,\nBangalore – 560 077, Karnataka, India", content_type: "textarea", sort_order: 4 },
  { page: "contact", section: "info", content_key: "phone", content_value: "+91 98765 43210", content_type: "text", sort_order: 5 },
  { page: "contact", section: "info", content_key: "email", content_value: "info@aiwindia.com", content_type: "text", sort_order: 6 },
  { page: "contact", section: "info", content_key: "hours", content_value: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: By Appointment", content_type: "textarea", sort_order: 7 },
  { page: "footer", section: "brand", content_key: "description", content_value: "Specialized interiors, civil & MEP services. Complete solution under one roof. Offices in Karnataka, Tamil Nadu & Telangana.", content_type: "textarea", sort_order: 0 },
  { page: "footer", section: "navigation", content_key: "title", content_value: "Navigation", content_type: "text", sort_order: 1 },
  { page: "footer", section: "services", content_key: "title", content_value: "Services", content_type: "text", sort_order: 2 },
  { page: "footer", section: "contact", content_key: "title", content_value: "Contact", content_type: "text", sort_order: 3 },
  { page: "footer", section: "contact", content_key: "address", content_value: "#47/1, Kanakashree Layout,\nDr. S.R.K. Nagar Post, Byrathi,\nBangalore – 560 077, Karnataka, India", content_type: "textarea", sort_order: 4 },
  { page: "footer", section: "contact", content_key: "phone", content_value: "+91 98765 43210", content_type: "text", sort_order: 5 },
  { page: "footer", section: "contact", content_key: "email", content_value: "info@aiwindia.com", content_type: "text", sort_order: 6 },
  { page: "footer", section: "legal", content_key: "website", content_value: "www.aiwindia.com", content_type: "text", sort_order: 7 },
  { page: "footer", section: "legal", content_key: "copyright", content_value: "AIW — Specialized Interiors, Civil & MEP Services. All rights reserved.", content_type: "text", sort_order: 8 },
];

export const getFallbackSiteContentMap = (page: string) =>
  fallbackSiteContent
    .filter((item) => item.page === page)
    .reduce<Record<string, string>>((acc, item) => {
      acc[`${item.section}.${item.content_key}`] = item.content_value;
      return acc;
    }, {});