import projectKsca1 from "@/assets/project-ksca-1.jpg";
import projectKsca2 from "@/assets/project-ksca-2.jpg";
import projectKsca3 from "@/assets/project-ksca-3.jpg";
import projectBluedart1 from "@/assets/project-bluedart-1.jpg";
import projectBluedart2 from "@/assets/project-bluedart-2.jpg";
import projectBluedart3 from "@/assets/project-bluedart-3.jpg";
import projectPelican1 from "@/assets/project-pelican-1.jpg";
import projectPelican2 from "@/assets/project-pelican-2.jpg";
import projectPelican3 from "@/assets/project-pelican-3.jpg";
import projectIisc1 from "@/assets/project-iisc-1.jpg";
import projectIisc2 from "@/assets/project-iisc-2.jpg";
import projectDellRestroom1 from "@/assets/project-dell-restroom-1.jpg";
import projectDellRestroom2 from "@/assets/project-dell-restroom-2.jpg";
import projectDellReception1 from "@/assets/project-dell-reception-1.jpg";
import projectDellReception2 from "@/assets/project-dell-reception-2.jpg";
import projectDellReception3 from "@/assets/project-dell-reception-3.jpg";
import projectAlphagrep1 from "@/assets/project-alphagrep-1.jpg";
import projectAlphagrep2 from "@/assets/project-alphagrep-2.jpg";
import projectAlphagrep3 from "@/assets/project-alphagrep-3.jpg";
import projectIbm1 from "@/assets/project-ibm-1.jpg";
import projectIbm2 from "@/assets/project-ibm-2.jpg";
import projectEmbassy1 from "@/assets/project-embassy-1.jpg";
import projectEmbassy2 from "@/assets/project-embassy-2.jpg";
import projectEmbassy3 from "@/assets/project-embassy-3.jpg";
import projectStonehillCafe1 from "@/assets/project-stonehill-cafe-1.jpg";
import projectStonehillCafe2 from "@/assets/project-stonehill-cafe-2.jpg";
import projectStonehillBoarding1 from "@/assets/project-stonehill-boarding-1.jpg";
import projectStonehillBoarding2 from "@/assets/project-stonehill-boarding-2.jpg";
import projectDivyasree1 from "@/assets/project-divyasree-1.jpg";
import projectFortis1 from "@/assets/project-fortis-1.jpg";
import projectFortis2 from "@/assets/project-fortis-2.jpg";
import projectFortis3 from "@/assets/project-fortis-3.jpg";
import projectLewagon1 from "@/assets/project-lewagon-1.jpg";
import projectRoyalenfield1 from "@/assets/project-royalenfield-1.jpg";

// Category Types
export type MainCategory = "Commercial" | "Residential";

export type CommercialSubCategory = "Hospitality" | "Healthcare" | "Institutions" | "Corporate" | "Retail";
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
      { key: "Corporate", label: "Corporate", description: "Corporate offices, IT companies & workspaces" },
      { key: "Hospitality", label: "Hospitality", description: "Hotels, resorts, stadiums & lodging" },
      { key: "Healthcare", label: "Healthcare", description: "Hospitals, clinics & medical centers" },
      { key: "Institutions", label: "Institutions", description: "Schools, colleges & educational facilities" },
      { key: "Retail", label: "Retail", description: "Retail showrooms & brand spaces" },
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
  gallery?: string[];
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
    slug: "karnataka-state-cricket-association",
    title: "Karnataka State Cricket Association",
    category: { main: "Commercial", sub: "Hospitality" },
    image: projectKsca1,
    gallery: [projectKsca2, projectKsca3],
    location: "Bangalore, India",
    year: "2022",
    description:
      "AIW created a truly unique VIP Rooms experience at the Karnataka State Cricket Stadium, blending classic charm, vibrant tones, and a minimalist aesthetic. The simplicity of the layout, combined with elegant design elements, brings sophistication to every detail — from doors, windows, and partitions to wardrobes, shower rooms, glass doors, furniture, mirrors, and tables.",
    highlights: [
      "VIP Rooms interior fitout",
      "Classic charm with minimalist aesthetic",
      "Custom furniture & glass doors",
      "Contemporary space transformation",
    ],
    details: {
      area: "5,000 sq ft",
      duration: "4 months",
      style: "Contemporary Minimalist",
    },
  },
  {
    id: 2,
    slug: "blue-dart-aviation",
    title: "Blue Dart Aviation Limited",
    category: { main: "Commercial", sub: "Corporate" },
    image: projectBluedart1,
    gallery: [projectBluedart2, projectBluedart3],
    location: "Devanahalli, Bangalore",
    year: "2021",
    description:
      "Located at Devanahalli, Bangalore, the project involved the renovation of the Stilt Floor and First Floor areas of the Airside Building, covering approximately 15,000 sq. ft. of floor space. AIW delivered a modern, efficient, and functional design aligned with the brand's global standards and operational excellence.",
    highlights: [
      "Airside Building renovation",
      "15,000 sq ft floor space",
      "Modern functional design",
      "Global brand standards compliance",
    ],
    details: {
      area: "15,000 sq ft",
      duration: "6 months",
      style: "Modern Corporate",
    },
  },
  {
    id: 3,
    slug: "maia-pelican-grove",
    title: "Maia Pelican Grove",
    category: { main: "Residential", sub: "Apartments" },
    image: projectPelican1,
    gallery: [projectPelican2, projectPelican3],
    location: "Jakkur Lake, Bangalore",
    year: "2023",
    description:
      "The quintessence of modern living immersed in nature, Pelican Grove offers a serene getaway without ever leaving home. Nestled along the banks of Jakkur Lake, these residences are surrounded by lush greenery, clean air, and open skies. Designed as an exclusive collection of 36 luxury apartments across 19 floors, Pelican Grove celebrates space, comfort, and elegance.",
    highlights: [
      "36 luxury apartments",
      "19 floors with lake views",
      "Luxurious finishes throughout",
      "Lakeside living experience",
    ],
    details: {
      area: "2,50,000 sq ft",
      duration: "24 months",
      style: "Luxury Contemporary",
    },
  },
  {
    id: 4,
    slug: "indian-institute-of-sciences",
    title: "Indian Institute of Sciences",
    category: { main: "Commercial", sub: "Institutions" },
    image: projectIisc1,
    gallery: [projectIisc2],
    location: "Bangalore, India",
    year: "2022",
    description:
      "The IISc project was designed to enhance the user experience by optimizing the boardroom glazing. Custom glazing films were used to soften the interiors while maintaining a modern and seamless aesthetic. Integrated planters were introduced into the breakout areas and entrance zones, bringing a touch of nature to the educational environment.",
    highlights: [
      "Boardroom glazing optimization",
      "Custom privacy glazing films",
      "Integrated planters in breakout areas",
      "Harmonious natural ambiance",
    ],
    details: {
      area: "3,000 sq ft",
      duration: "3 months",
      style: "Modern Educational",
    },
  },
  {
    id: 5,
    slug: "dell-international-restrooms",
    title: "Dell International Services — Restrooms",
    category: { main: "Commercial", sub: "Corporate" },
    image: projectDellRestroom1,
    gallery: [projectDellRestroom2],
    location: "Domlur, Bangalore",
    year: "2020",
    description:
      "Dell International Services (Dell-4), located at Domlur – Intermediate Ring Road, Bangalore. AIW was entrusted with the renovation of restrooms at Annex A & B, covering approximately 15,000 sq. ft. The project involved the refurbishment of 30 restroom banks with modern, functional, and efficient designs while ensuring premium finishes.",
    highlights: [
      "30 restroom banks refurbished",
      "15,000 sq ft renovation",
      "Premium finishes & materials",
      "Global corporate standards",
    ],
    details: {
      area: "15,000 sq ft",
      duration: "5 months",
      style: "Modern Corporate",
    },
  },
  {
    id: 6,
    slug: "dell-international-reception",
    title: "Dell International Services — Reception",
    category: { main: "Commercial", sub: "Corporate" },
    image: projectDellReception1,
    gallery: [projectDellReception2, projectDellReception3],
    location: "Domlur, Bangalore",
    year: "2021",
    description:
      "AIW was entrusted with the renovation of the reception area at Dell-4, spanning approximately 10,000 sq. ft. The design focused on creating a reception of global eminence, integrating vital meeting rooms, breakout areas, quiet zones, and utility spaces. A vibrant color palette and echo-themed elements bring the space to life.",
    highlights: [
      "10,000 sq ft reception renovation",
      "Global-standard reception design",
      "Meeting rooms & breakout areas",
      "Custom wall graphics & accent walls",
    ],
    details: {
      area: "10,000 sq ft",
      duration: "4 months",
      style: "Corporate Contemporary",
    },
  },
  {
    id: 7,
    slug: "alphagrep-securities",
    title: "Alphagrep Securities",
    category: { main: "Commercial", sub: "Corporate" },
    image: projectAlphagrep1,
    gallery: [projectAlphagrep2, projectAlphagrep3],
    location: "Bangalore, India",
    year: "2023",
    description:
      "AIW was entrusted with the interior design and fit-out of Alphagrep's 6,500 sq. ft. office, creating a modern, collaborative, and functional workspace with multiple meeting rooms, breakout spaces, hot desks, seminar rooms, and staff amenities.",
    highlights: [
      "6,500 sq ft office fit-out",
      "Advanced AV integration",
      "Ergonomic workstations",
      "Collaborative open environment",
    ],
    details: {
      area: "6,500 sq ft",
      duration: "4 months",
      style: "Modern Tech Workspace",
    },
  },
  {
    id: 8,
    slug: "ibm-embassy-centrx",
    title: "IBM Embassy Centrx",
    category: { main: "Commercial", sub: "Corporate" },
    image: projectIbm1,
    gallery: [projectIbm2],
    location: "Bangalore, India",
    year: "2022",
    description:
      "Corporate office interiors for IBM at Embassy Centrx, delivering a premium workspace that reflects the global technology giant's brand values. The project involved modern interior fit-out with contemporary design elements and high-quality finishes.",
    highlights: [
      "Premium corporate interiors",
      "Brand-aligned design",
      "High-quality finishes",
      "Modern workspace solutions",
    ],
    details: {
      area: "20,000 sq ft",
      duration: "6 months",
      style: "Corporate Premium",
    },
  },
  {
    id: 9,
    slug: "embassy-d-parcel-manyata",
    title: "Embassy D-Parcel (Manyata)",
    category: { main: "Commercial", sub: "Corporate" },
    image: projectEmbassy1,
    gallery: [projectEmbassy2, projectEmbassy3],
    location: "Manyata Tech Park, Bangalore",
    year: "2023",
    description:
      "AIW delivered premium interior finishing works at Manyata, including demolition of existing floors, wall cladding, and false ceilings, followed by installation of aluminium-framed wall panels, screeding works, vitrified tile flooring, tactile flooring, and PVDF lift jambs.",
    highlights: [
      "Lobby & lift lobby finishing",
      "Aluminium-framed wall panels",
      "Tactile flooring for accessibility",
      "PVDF lift jambs with premium finish",
    ],
    details: {
      area: "25,000 sq ft",
      duration: "5 months",
      style: "Premium Commercial",
    },
  },
  {
    id: 10,
    slug: "stonehill-international-cafeteria",
    title: "Stonehill International School — Cafeteria",
    category: { main: "Commercial", sub: "Institutions" },
    image: projectStonehillCafe1,
    gallery: [projectStonehillCafe2],
    location: "Bangalore, India",
    year: "2024",
    description:
      "Successful completion of the Cafeteria Expansion Project for Stonehill International School, covering a total built-up area of 7,400 sq. ft. The project included complete construction, turnkey interior works, custom-designed furniture, comprehensive external development, and premium Mexican grass lawns.",
    highlights: [
      "7,400 sq ft cafeteria expansion",
      "Turnkey interior works",
      "Custom-designed furniture",
      "Premium landscaping",
    ],
    details: {
      area: "7,400 sq ft",
      duration: "5 months",
      style: "Modern Educational",
    },
  },
  {
    id: 11,
    slug: "stonehill-international-boarding",
    title: "Stonehill International School — Boarding",
    category: { main: "Commercial", sub: "Institutions" },
    image: projectStonehillBoarding1,
    gallery: [projectStonehillBoarding2],
    location: "Bangalore, India",
    year: "2023",
    description:
      "Spread across 20,000 sq. ft., the student boarding facility offers 33 well-designed rooms with modern comforts, a recreation area, music rooms, indoor playroom, dedicated room for differently-abled students, house parent's room, and a welcoming parents' lounge.",
    highlights: [
      "20,000 sq ft boarding facility",
      "33 well-designed rooms",
      "Recreation & music rooms",
      "Inclusive design features",
    ],
    details: {
      area: "20,000 sq ft",
      duration: "8 months",
      style: "Modern Institutional",
    },
  },
  {
    id: 12,
    slug: "divyasree-greens",
    title: "Divyasree Greens",
    category: { main: "Commercial", sub: "Corporate" },
    image: projectDivyasree1,
    location: "Domlur, Bangalore",
    year: "2024",
    description:
      "Divyasree Greens is a landmark commercial office building in Domlur, occupied by Dell and IBM. AIW's scope included complete turnkey renovation of the main entrance lobby and all floor lift lobbies, covering civil, interiors, electrical, and MEP works, plus restroom renovations across five banks.",
    highlights: [
      "Double-height reception renovation",
      "Lift lobby renovations",
      "Civil, interiors, electrical & MEP",
      "Restroom bank refurbishment",
    ],
    details: {
      area: "15,000 sq ft",
      duration: "6 months",
      style: "Corporate Premium",
    },
  },
  {
    id: 13,
    slug: "fortis-hospital",
    title: "Fortis Hospital",
    category: { main: "Commercial", sub: "Healthcare" },
    image: projectFortis1,
    gallery: [projectFortis2, projectFortis3],
    location: "Bangalore, India",
    year: "2023",
    description:
      "A prestigious healthcare project at Fortis Hospital, delivering a complete transformation of medical and patient care spaces. The project included renovation of 40 doctor consultation OPD rooms, patient suites, post-surgery recovery rooms, and three reception counters.",
    highlights: [
      "40 OPD consultation rooms",
      "Patient suites & recovery rooms",
      "Private, deluxe & royal suites",
      "3 reception counters redesigned",
    ],
    details: {
      area: "30,000 sq ft",
      duration: "8 months",
      style: "Modern Healthcare",
    },
  },
  {
    id: 14,
    slug: "le-wagon",
    title: "Le Wagon",
    category: { main: "Commercial", sub: "Institutions" },
    image: projectLewagon1,
    location: "Bangalore, India",
    year: "2024",
    description:
      "Le Wagon is a dynamic learning and training centre created under an Indo-French collaboration. The centre includes modern classrooms, versatile learning spaces, a dedicated event area, executive cabins, a stylish lounge with breakout zones, and a well-equipped bar and pantry.",
    highlights: [
      "Indo-French collaboration",
      "Modern classrooms & event area",
      "Executive cabins & lounge",
      "Breakout zones & pantry",
    ],
    details: {
      area: "5,000 sq ft",
      duration: "3 months",
      style: "Contemporary Learning",
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
