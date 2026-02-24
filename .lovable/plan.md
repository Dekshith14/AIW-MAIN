

# Content Update Plan: AIW Profile PDF to Website

## Overview
Replace all placeholder/dummy content across the website with real company data from the AIW Capability Statement PDF. This is a content-only update -- no design, layout, or functionality changes.

---

## 1. Copy Project Images from PDF

Copy relevant images extracted from the PDF into `src/assets/` for use across the site. Key images to import:

| Source Image | Target Asset Name | Usage |
|---|---|---|
| img_p0_4.png | aiw-logo.png | Logo/branding |
| img_p20_1.jpg, img_p20_2.jpg, img_p20_3.jpg | project-ksca-1/2/3.jpg | Karnataka State Cricket Association |
| img_p21_1.jpg, img_p21_2.jpg, img_p21_3.jpg | project-bluedart-1/2/3.jpg | Blue Dart Aviation |
| img_p23_1.jpg - img_p23_6.jpg | project-pelican-1..6.jpg | Maia Pelican Grove |
| img_p25_2.jpg - img_p25_5.jpg | project-iisc-1..4.jpg | Indian Institute of Sciences |
| img_p26_1.jpg, img_p26_2.jpg | project-dell-restroom-1/2.jpg | Dell Restrooms |
| img_p29_1.jpg - img_p29_3.jpg | project-dell-reception-1..3.jpg | Dell Reception |
| img_p30_1.jpg - img_p30_3.jpg | project-alphagrep-1..3.jpg | Alphagrep Securities |
| img_p32_1.jpg - img_p32_4.jpg | project-ibm-1..4.jpg | IBM Embassy Centrx |
| img_p33_1.jpg - img_p33_5.jpg | project-embassy-dparcel-1..5.jpg | Embassy D-Parcel |
| img_p35_1.jpg - img_p35_4.jpg | project-stonehill-cafe-1..4.jpg | Stonehill Cafeteria |
| img_p36_1.jpg, img_p36_2.jpg | project-stonehill-boarding-1/2.jpg | Stonehill Boarding |
| img_p37_1.jpg | project-divyasree-1.jpg | Divyasree Greens |
| img_p39_1.jpg | project-fortis-1.jpg | Fortis Hospital |
| img_p40_1.jpg, img_p40_2.jpg | project-fortis-2/3.jpg | Fortis Hospital gallery |
| img_p42_1.jpg | project-lewagon-1.jpg | Le Wagon |
| img_p9_1.jpg | project-royalenfield-1.jpg | Royal Enfield |
| img_p7_1.jpg - img_p7_8.jpg | team/workspace images | Team section |
| img_p3_1.jpg or page_3.jpg | hero-image.jpg | Hero background option |

---

## 2. Update Category Hierarchy

**File:** `src/data/projects.ts`

Add two new Commercial subcategories to match the PDF's "Reference Markets":

- **Corporate** -- Corporate offices, IT companies (Dell, IBM, Alphagrep)
- **Retail** -- Retail spaces (Royal Enfield, Asian Paints)

Updated hierarchy:
- Commercial: Hospitality, Healthcare, Institutions, Offices, Corporate, Retail
- Residential: Apartments, Villas

Alternatively, simplify by mapping Corporate projects to the existing "Offices" subcategory and Retail to a new "Retail" subcategory.

---

## 3. Replace Project Data

**File:** `src/data/projects.ts`

Remove all 7 placeholder projects and replace with real AIW projects from the PDF:

1. **Karnataka State Cricket Association** -- VIP Rooms interior fitout (Commercial > Hospitality)
2. **Blue Dart Aviation** -- Airside Building renovation, 15,000 sq ft (Commercial > Corporate)
3. **Maia Pelican Grove** -- 36 luxury apartments, 19 floors (Residential > Apartments)
4. **Indian Institute of Sciences** -- Boardroom glazing & breakout areas (Commercial > Institutions)
5. **Dell International Services - Restrooms** -- 30 restroom banks, 15,000 sq ft (Commercial > Corporate)
6. **Dell International Services - Reception** -- Reception renovation, 10,000 sq ft (Commercial > Corporate)
7. **Alphagrep Securities** -- Office interior & fit-out, 6,500 sq ft (Commercial > Corporate)
8. **IBM Embassy Centrx** -- Corporate office interiors (Commercial > Corporate)
9. **Embassy D-Parcel (Manyata)** -- Finishing works, lobbies (Commercial > Corporate)
10. **Stonehill International School - Cafeteria** -- 7,400 sq ft cafeteria expansion (Commercial > Institutions)
11. **Stonehill International School - Boarding** -- 20,000 sq ft, 33 rooms (Commercial > Institutions)
12. **Divyasree Greens** -- Lobby renovation for IBM/Dell (Commercial > Corporate)
13. **Fortis Hospital** -- 40 OPD rooms, patient suites (Commercial > Healthcare)
14. **Le Wagon** -- Training centre, Indo-French collaboration (Commercial > Institutions)

Each project will use descriptions and highlights directly from the PDF, with gallery images from the extracted PDF images.

---

## 4. Update About Page

**File:** `src/pages/About.tsx`

| Section | Current (Placeholder) | New (From PDF) |
|---|---|---|
| Heading | "Building Dreams Since 2006" | "Building Spaces Since 2013" |
| Paragraph 1 | Generic founding story | "Founded in 2013, AIW is a dynamic specialist organization delivering services across multiple domains..." |
| Paragraph 2 | Generic approach text | "We maintain a strong competitive edge through efficiency, flexibility, and an unwavering commitment to quality..." |
| Paragraph 3 | Generic portfolio text | "Today, AIW continues to achieve steady growth and proudly employs nearly 50 skilled professionals..." |
| Founder name | "Alexander Wright" | Remove or replace with actual team info |
| Vision | Generic | "To be the foremost authority in creating spaces that inspire through competent, timely and cost-effective solutions" |
| Mission | Generic | "To deliver high-quality, cost-effective services that comply with both local and international standards while remaining deeply respectful of the environment" |
| Stats | 250+ projects, 18 years, 45+ awards, 35 team | Update to realistic numbers: e.g. 100+ projects, 12 years (since 2013), 50+ professionals |

---

## 5. Update Hero Section

**File:** `src/components/home/HeroSection.tsx`

| Element | Current | New |
|---|---|---|
| Subtitle | "Premium Construction & Interior Design" | "Specialized Interiors, Civil & MEP Services" |
| Heading line 1 | "Building Spaces" | "Complete Solution" |
| Heading line 2 (italic) | "Intelligently" | "Under One Roof" |
| Description | Generic text | "We craft exceptional living and working environments through specialized interiors, civil works, and MEP services across corporate, hospitality, healthcare, and residential sectors." |

---

## 6. Update Services Page

**File:** `src/pages/Services.tsx`

Replace the 6 placeholder services with AIW's actual service offerings from the PDF:

1. **Specialized Interiors** -- Full interior fit-out from concept to completion
2. **Civil & MEP Services** -- Comprehensive civil, electrical, and MEP works
3. **Architectural Design & CAD** -- Design detailing, documentation, and CAD drawing
4. **Workshop & Furniture Manufacturing** -- Custom modular furniture, office desks, conference tables, seating
5. **Turnkey Projects** -- End-to-end project management and delivery
6. **Project Consultation** -- Site appraisals, planning, feasibility studies

Update features lists to match the PDF content for each service.

---

## 7. Update Services Preview (Homepage)

**File:** `src/components/home/ServicesPreview.tsx`

Align the 5 homepage service items with the updated services from step 6.

---

## 8. Update Stats Section

**File:** `src/components/home/StatsSection.tsx`

| Current | New |
|---|---|
| 250+ Projects | 100+ Projects Completed |
| 18 Years | 12+ Years of Excellence |
| 45+ Awards | 50+ Professionals |
| 98% Satisfaction | 6+ Sectors Served |

---

## 9. Update Contact Information

**Files:** `src/pages/Contact.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/FloatingContact.tsx`

| Field | Current (Placeholder) | New (From PDF) |
|---|---|---|
| Address | 123 Architecture Avenue, NY 10001 | #47/1, Kanakashree Layout, Dr. S.R.K. Nagar Post, Byrathi, Bangalore - 560 077, Karnataka, India |
| Website | - | www.aiwindia.com |
| Phone | +1 (234) 567-890 | Update to actual Indian number |
| Email | hello@aiw.com | Keep or update if actual email is known |

---

## 10. Update Footer

**File:** `src/components/layout/Footer.tsx`

- Update brand description to: "Specialized interiors, civil & MEP services. Complete solution under one roof."
- Update address to Bangalore office
- Update navigation links to match actual pages
- Add "Offices in Tamil Nadu and Telangana" mention

---

## 11. Update Page Meta / SEO

**File:** `index.html`

- Update meta description to reflect actual AIW services: specialized interiors, civil & MEP
- Update keywords to include: interior contractor, Bangalore, modular furniture, corporate interiors, healthcare interiors

---

## 12. Reference Markets Section

**File:** `src/components/home/ServicesPreview.tsx` or `src/pages/Services.tsx`

Add the 6 reference markets from the PDF as a visual element:
- Corporate
- Hospitality
- Retail
- Healthcare
- Industries
- Residential

---

## Technical Notes

- All image copies use `parsed-documents://` to `src/assets/` path
- Images are imported as ES6 modules in components
- No routing, API, or component logic changes
- Project slugs will be regenerated from real project names
- The `RequestQuote.tsx` service dropdown options will be updated to match new service names
- The `categoryHierarchy` object will be extended with "Corporate" and "Retail" subcategories

