import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectInterior from "@/assets/project-interior.jpg";
import projectRenovation from "@/assets/project-renovation.jpg";
import projectSpa from "@/assets/project-spa.jpg";
import projectHospitality from "@/assets/project-hospitality.jpg";
import projectInstitution from "@/assets/project-institution.jpg";

// Category Types
export type MainCategory = "Commercial" | "Residential";

export type CommercialSubCategory = "Hospitality" | "Healthcare" | "Institutions" | "Offices";
export type ResidentialSubCategory = "Apartments" | "Villas";
export type SubCategory = CommercialSubCategory | ResidentialSubCategory;

export interface CategoryStructure {
  main: MainCategory;
  sub: SubCategory;
}

// Category Hierarchy Definition
export const categoryHierarchy: Record<MainCategory, { label: string; subcategories: { key: SubCategory; label: string; description: string }[] }> = {
  Commercial: {
    label: "Commercial",
    subcategories: [
      { key: "Hospitality", label: "Hospitality", description: "Hotels, resorts, serviced stays & lodging" },
      { key: "Healthcare", label: "Healthcare", description: "Hospitals, clinics & medical centers" },
      { key: "Institutions", label: "Institutions", description: "Schools, colleges & educational facilities" },
      { key: "Offices", label: "Offices", description: "Corporate offices & co-working spaces" },
    ],
  },
  Residential: {
    label: "Residential",
    subcategories: [
      { key: "Apartments", label: "Apartments", description: "Flats, gated communities & multi-unit buildings" },
      { key: "Villas", label: "Villas", description: "Independent houses, bungalows & luxury villas" },
    ],
  },
};

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: CategoryStructure;
  image: string;
  gallery?: string[]; // Optional array of additional images
  location: string;
  year: string;
  description: string;
  highlights: string[];
  details: {
    area: string;
    duration: string;
    style: string;
  };
}
 
export const projects: Project[] = [
  {
    id: 1,
    slug: "serenity-villa",
    title: "Serenity Villa",
    category: { main: "Residential", sub: "Villas" },
    image: projectResidential,
    gallery: [projectInterior, projectSpa], // Example: additional views
    location: "Beverly Hills, CA",
    year: "2024",
    description:
      "A contemporary masterpiece that seamlessly blends indoor and outdoor living. This luxury residence features floor-to-ceiling windows, natural materials, and sustainable design principles throughout.",
    highlights: [
      "Smart home integration",
      "Infinity pool with city views",
      "Home theater and wine cellar",
      "Sustainable materials",
    ],
    details: {
      area: "12,500 sq ft",
      duration: "18 months",
      style: "Contemporary Modern",
    },
  },
  {
    id: 2,
    slug: "nexus-office-complex",
    title: "Nexus Office Complex",
    category: { main: "Commercial", sub: "Offices" },
    image: projectCommercial,
    location: "Manhattan, NY",
    year: "2023",
    description:
      "A state-of-the-art office building designed to foster collaboration and innovation. The open floor plans, abundant natural light, and biophilic design elements create an inspiring work environment.",
    highlights: [
      "LEED Platinum certified",
      "Flexible workspace design",
      "Rooftop garden amenity",
      "Advanced HVAC systems",
    ],
    details: {
      area: "85,000 sq ft",
      duration: "24 months",
      style: "Modern Industrial",
    },
  },
  {
    id: 3,
    slug: "haven-suite",
    title: "The Haven Suite",
    category: { main: "Residential", sub: "Apartments" },
    image: projectInterior,
    location: "Miami, FL",
    year: "2024",
    description:
      "A serene master suite retreat designed as a personal sanctuary. The design emphasizes natural textures, a muted color palette, and custom furnishings that create an atmosphere of refined tranquility.",
    highlights: [
      "Custom millwork throughout",
      "Integrated lighting design",
      "Spa-inspired bathroom",
      "Walk-in closet system",
    ],
    details: {
      area: "1,800 sq ft",
      duration: "4 months",
      style: "Contemporary Minimalist",
    },
  },
  {
    id: 4,
    slug: "grand-hotel-lobby",
    title: "Grand Hotel Lobby",
    category: { main: "Commercial", sub: "Hospitality" },
    image: projectRenovation,
    location: "Chicago, IL",
    year: "2023",
    description:
      "A stunning renovation of a historic hotel lobby that honors its architectural heritage while introducing modern luxury. Crystal chandeliers, marble floors, and gold accents create an unforgettable first impression.",
    highlights: [
      "Historic preservation",
      "Custom lighting fixtures",
      "Restored marble floors",
      "Modern reception area",
    ],
    details: {
      area: "5,000 sq ft",
      duration: "8 months",
      style: "Art Deco Revival",
    },
  },
  {
    id: 5,
    slug: "marble-spa-retreat",
    title: "Marble Spa Retreat",
    category: { main: "Residential", sub: "Villas" },
    image: projectSpa,
    location: "Aspen, CO",
    year: "2024",
    description:
      "A luxurious spa bathroom featuring floor-to-ceiling marble, a freestanding soaking tub, and brass accents. Every detail was carefully considered to create a hotel-quality experience at home.",
    highlights: [
      "Calacatta marble surfaces",
      "Heated floors",
      "Steam shower",
      "Custom brass fixtures",
    ],
    details: {
      area: "400 sq ft",
      duration: "3 months",
      style: "Luxury Spa",
    },
  },
  {
    id: 6,
    slug: "city-general-hospital",
    title: "City General Hospital",
    category: { main: "Commercial", sub: "Healthcare" },
    image: projectHospitality,
    gallery: [projectCommercial, projectInstitution], // Example: additional views
    location: "Delhi, India",
    year: "2024",
    description:
      "A state-of-the-art 500-bed multi-specialty hospital designed with patient comfort and operational efficiency in mind. Features include modular ICUs, advanced surgical suites, and healing-focused interior design.",
    highlights: [
      "500+ bed capacity",
      "Modular ICU design",
      "Healing garden courtyards",
      "Energy-efficient systems",
    ],
    details: {
      area: "2,50,000 sq ft",
      duration: "36 months",
      style: "Modern Healthcare",
    },
  },
  {
    id: 7,
    slug: "heritage-international-school",
    title: "Heritage International School",
    category: { main: "Commercial", sub: "Institutions" },
    image: projectInstitution,
    location: "Bangalore, India",
    year: "2023",
    description:
      "A contemporary educational campus designed to inspire learning and creativity. The design incorporates flexible classroom spaces, collaborative zones, and sustainable architecture principles.",
    highlights: [
      "Smart classroom technology",
      "Amphitheater & auditorium",
      "Sports complex",
      "Green building certified",
    ],
    details: {
      area: "1,50,000 sq ft",
      duration: "24 months",
      style: "Contemporary Educational",
    },
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getProjectsByMainCategory = (mainCategory: MainCategory | "All"): Project[] => {
  if (mainCategory === "All") return projects;
  return projects.filter((p) => p.category.main === mainCategory);
};

export const getProjectsBySubCategory = (subCategory: SubCategory | "All"): Project[] => {
  if (subCategory === "All") return projects;
  return projects.filter((p) => p.category.sub === subCategory);
};

export const getProjectsByFilter = (
  mainCategory: MainCategory | "All",
  subCategory: SubCategory | "All"
): Project[] => {
  return projects.filter((p) => {
    const matchesMain = mainCategory === "All" || p.category.main === mainCategory;
    const matchesSub = subCategory === "All" || p.category.sub === subCategory;
    return matchesMain && matchesSub;
  });
};