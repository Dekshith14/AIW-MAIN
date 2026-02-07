# AIW Website - Project Guide

This guide explains how to use, update, and maintain the AIW construction & interior design website.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [How to Update Content](#how-to-update-content)
3. [Adding New Projects](#adding-new-projects)
4. [Updating Images](#updating-images)
5. [Modifying Text Content](#modifying-text-content)
6. [Category System](#category-system)
7. [Backend & Data Storage](#backend--data-storage)
8. [Common Tasks](#common-tasks)

---

## Project Structure

```
src/
├── assets/                 # All images (hero, projects, team)
├── components/
│   ├── home/              # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── layout/            # Header, Footer, Layout wrapper
│   └── ui/                # Reusable UI components
├── data/
│   └── projects.ts        # ⭐ MAIN PROJECT DATA FILE
├── pages/                 # All page components
│   ├── Index.tsx          # Homepage
│   ├── About.tsx          # About page
│   ├── Services.tsx       # Services page
│   ├── Projects.tsx       # Portfolio listing
│   ├── ProjectDetail.tsx  # Individual project page
│   ├── Contact.tsx        # Contact page
│   └── RequestQuote.tsx   # Quote request form
└── index.css              # Global styles & design tokens
```

---

## How to Update Content

### Quick Reference

| What to Change | File Location |
|----------------|---------------|
| Projects/Portfolio | `src/data/projects.ts` |
| Homepage Hero | `src/components/home/HeroSection.tsx` |
| Services List | `src/pages/Services.tsx` |
| Testimonials | `src/components/home/TestimonialsSection.tsx` |
| Company Stats | `src/components/home/StatsSection.tsx` |
| About Page | `src/pages/About.tsx` |
| Contact Info | `src/pages/Contact.tsx` |
| Footer Links | `src/components/layout/Footer.tsx` |
| Navigation | `src/components/layout/Header.tsx` |

---

## Adding New Projects

### Step 1: Add Your Image

1. Place your project image in `src/assets/` folder
2. Recommended: Name it descriptively (e.g., `project-luxury-villa.jpg`)
3. Recommended size: 1200x800px or similar aspect ratio

### Step 2: Import the Image

Open `src/data/projects.ts` and add an import at the top:

```typescript
import projectLuxuryVilla from "@/assets/project-luxury-villa.jpg";
```

### Step 3: Add Project Data

Add a new object to the `projects` array:

```typescript
{
  id: 8,  // Use next available ID
  slug: "luxury-villa-mumbai",  // URL-friendly name (lowercase, hyphens)
  title: "Luxury Villa Mumbai",
  category: { 
    main: "Residential",  // "Commercial" or "Residential"
    sub: "Villas"         // See category options below
  },
  image: projectLuxuryVilla,  // Your imported main image
  gallery: [projectLuxuryVilla2, projectLuxuryVilla3],  // Optional: additional images
  location: "Mumbai, India",
  year: "2024",
  description: "A stunning luxury villa featuring contemporary architecture with traditional Indian elements. Floor-to-ceiling windows offer panoramic city views.",
  highlights: [
    "Smart home automation",
    "Private infinity pool",
    "Home theater",
    "Landscaped gardens"
  ],
  details: {
    area: "8,500 sq ft",
    duration: "14 months",
    style: "Contemporary Indian"
  }
}
```

### Adding Multiple Images (Gallery)

Projects now support multiple images! To add a gallery:

1. Import additional images at the top of `src/data/projects.ts`
2. Add them to the `gallery` array (optional field)
3. The main `image` is always shown first, followed by gallery images

```typescript
// Example with gallery
{
  image: projectMainView,
  gallery: [projectInterior, projectExterior, projectPool],
  // ... rest of project data
}
```

The project detail page will show:
- Thumbnail strip for navigation
- Arrow navigation between images
- Fullscreen lightbox on click

### Category Options

**Commercial:**
- `Hospitality` - Hotels, resorts, lodging
- `Healthcare` - Hospitals, clinics, medical centers
- `Institutions` - Schools, colleges, educational facilities
- `Offices` - Corporate offices, co-working spaces

**Residential:**
- `Apartments` - Flats, gated communities
- `Villas` - Independent houses, bungalows

---

## Updating Images

### Project Images
1. Add new image to `src/assets/`
2. Import it in `src/data/projects.ts`
3. Update the `image` field in the project object

### Hero/Background Images
1. Add image to `src/assets/`
2. Open the relevant component file
3. Import and use the image:

```typescript
// At top of file
import myHeroImage from "@/assets/my-hero-image.jpg";

// In the component
<img src={myHeroImage} alt="Description" />
```

### Image Recommendations

| Image Type | Recommended Size | Format |
|------------|------------------|--------|
| Hero images | 1920x1080px | JPG |
| Project thumbnails | 1200x800px | JPG |
| Team photos | 600x600px | JPG |
| Icons/logos | 200x200px | PNG/SVG |

---

## Modifying Text Content

### Homepage Sections

**Hero Section** (`src/components/home/HeroSection.tsx`):
```typescript
// Find and edit these lines:
<h1>Building Spaces That Inspire</h1>
<p>Premium construction and interior design...</p>
```

**Stats Section** (`src/components/home/StatsSection.tsx`):
```typescript
const stats = [
  { number: "250+", label: "Projects Completed" },
  { number: "15+", label: "Years Experience" },
  // Edit these values
];
```

**Testimonials** (`src/components/home/TestimonialsSection.tsx`):
```typescript
const testimonials = [
  {
    quote: "Your testimonial text here...",
    author: "Client Name",
    role: "Role, Company"
  },
  // Add more testimonials
];
```

### Services Page

Open `src/pages/Services.tsx` and find the `services` array:

```typescript
const services = [
  {
    icon: Building2,
    title: "Construction Solutions",
    description: "Your description...",
    features: ["Feature 1", "Feature 2", "Feature 3"]
  },
  // Add or edit services
];
```

### Contact Information

Open `src/pages/Contact.tsx` and update:

```typescript
// Find contact details section
<p>+1 (555) 123-4567</p>
<p>hello@aiw-design.com</p>
<p>123 Design Avenue, Creative District</p>
```

Also update in `src/components/layout/Footer.tsx`.

---

## Category System

The project uses a hierarchical category system:

```
├── Commercial
│   ├── Hospitality (hotels, resorts, lodging)
│   ├── Healthcare (hospitals, clinics)
│   ├── Institutions (schools, colleges)
│   └── Offices (corporate, co-working)
│
└── Residential
    ├── Apartments (flats, gated communities)
    └── Villas (independent houses, bungalows)
```

### Adding New Subcategories

1. Open `src/data/projects.ts`
2. Add to the type definitions:

```typescript
export type CommercialSubCategory = "Hospitality" | "Healthcare" | "Institutions" | "Offices" | "NewCategory";
```

3. Add to `categoryHierarchy`:

```typescript
Commercial: {
  subcategories: [
    // existing...
    { key: "NewCategory", label: "New Category", description: "Description here" }
  ]
}
```

4. Update `src/pages/RequestQuote.tsx` to include in the form dropdown

---

## Backend & Data Storage

### Current Setup (Frontend Only)

Currently, the website is **frontend-only** with no backend database:

- **Projects**: Stored in `src/data/projects.ts`
- **Contact Form**: Shows success message but doesn't send emails
- **Quote Requests**: Shows success message but doesn't save data

### Enabling Backend (Lovable Cloud)

To add real backend functionality:

1. Click **"Enable Cloud"** in Lovable
2. This will enable:
   - ✅ Database storage for quote requests
   - ✅ Email notifications for contact forms
   - ✅ User authentication (if needed)
   - ✅ File storage for uploaded images

### What Backend Would Enable

| Feature | Current | With Backend |
|---------|---------|--------------|
| Quote requests | Shows toast only | Saves to database + email |
| Contact form | Shows toast only | Sends email notification |
| Projects | Edit code | Admin panel to manage |
| Images | Manual upload | Upload through interface |

---

## Common Tasks

### Task 1: Add a New Project

1. Add image to `src/assets/`
2. Open `src/data/projects.ts`
3. Import the image at the top
4. Add project object to the `projects` array
5. Save file

### Task 2: Update Company Phone/Email

Files to update:
- `src/pages/Contact.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/FloatingContact.tsx` (WhatsApp/Call button)

### Task 3: Update WhatsApp/Call Button

Open `src/components/layout/FloatingContact.tsx` and update:

```typescript
const phoneNumber = "+919876543210"; // Your phone number
const whatsappNumber = "919876543210"; // WhatsApp format (no + or spaces)
const whatsappMessage = "Your custom message here";
```

### Task 4: Change Hero Text

Open `src/components/home/HeroSection.tsx` and edit the text content.

### Task 4: Add New Testimonial

Open `src/components/home/TestimonialsSection.tsx` and add to the `testimonials` array:

```typescript
{
  id: 4,
  quote: "New testimonial text...",
  author: "New Author",
  role: "Their Role"
}
```

### Task 5: Update Featured Projects on Homepage

Open `src/components/home/FeaturedProjects.tsx` and modify the `projects` array to show different projects.

### Task 6: Change Colors/Theme

Open `src/index.css` and `tailwind.config.ts` to modify the design tokens:

```css
/* In index.css */
:root {
  --gold: 43 74% 49%;        /* Accent color */
  --charcoal: 220 13% 13%;   /* Dark background */
  --stone: 30 10% 60%;       /* Neutral text */
}
```

---

## Need Help?

- **Lovable Docs**: https://docs.lovable.dev/
- **Add Backend**: Ask Lovable to "Enable Cloud" for database & email features
- **Custom Features**: Describe what you need in the chat

---

*Last updated: February 2025*
