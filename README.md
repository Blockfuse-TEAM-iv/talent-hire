dev.talent
Talent Hire Page — Project Brief & Team Task Breakdown
HTML  ·  Tailwind CSS v4 (CLI)  ·  Vanilla JavaScript  ·  5-Person Team

----------------------------------------------------------------------------------------
1. Project Overview
This document captures the full scope, architecture decisions, and task breakdown for the Dev Talent Board — a single-page application that displays developer profiles as cards and routes to individual profile pages without reloading or using a framework.

Tech stack:  HTML, Tailwind CSS v4 (CLI), Vanilla JavaScript (ES Modules)
Team size:  5 members (1 project lead + 4 developers)
Pages:  2 HTML files — index.html and profile.html
Routing:  URL query string (?dev=id) — no server required
Framework:  None — zero runtime dependencies

------------------------------------------------------------------------------------------
2. Architecture
The project uses a minimal file structure. The profile page is static HTML — it never changes. JavaScript reads the URL query string, finds the matching developer object by ID in data.js, and populates the page dynamically.

File Structure
project/
├── index.html      ← cards listing page
├── profile.html    ← single reusable profile page
├── data.js         ← all 5 developer objects (shared source of truth)
├── app.js          ← routing + render logic
├── src/input.css   ← Tailwind v4 entry (@import "tailwindcss" + @theme)
└── src/output.css  ← compiled CSS (generated — do not edit)

How Routing Works
profile.html stays static. When someone clicks a card on index.html, they are navigated to profile.html?dev=DEV-001. The app.js file reads that URL parameter, finds the matching developer object by its id field in data.js, and uses it to populate all the labelled placeholder elements on the page. Using a unique id prevents any issues from name clashes between developers.
If an invalid or missing id is passed in the URL, app.js redirects the user back to index.html gracefully.

----------------------------------------------------------------------------------------------------
Member 3 DOUBLE-T
Card Component

Tasks
    • Implement renderCards() — receives the developers array and injects card HTML into #cards-grid
    • Each card includes: avatar or styled initials fallback, name, role, bio clamped to 3 lines, top 4 skill tags, and an availability indicator
    • Clicking a card navigates to profile.html?dev={id}
    • Style entirely with Tailwind utility classes — hover effects, transitions, responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3)
    • Handle the edge case where avatar is an empty string — render styled initials instead

Deliverable:  A fully styled, responsive cards grid populated from data.js.

Member 4 MIRACLE AGROS
Polish, Header & Responsiveness

Tasks
    • Build out the hero section of index.html — headline, subtext, and a live count of available developers injected by JS
    • Style the header and navbar consistently on both pages — logo and tagline
    • Do a full responsive pass on both pages — test at 375px, 768px, and 1280px
    • Add subtle animations using Tailwind’s transition, duration, and ease classes — card hover lifts, profile fade-in on load
    • Add a 404 state on profile.html for invalid IDs — a centered message with a link back to index.html

Deliverable:  Both pages look polished and work correctly at all screen sizes.

Member 5 JOHN
Data & Personal Profiles

Tasks
    • Create and export the developers array in data.js
    • Use the agreed data shape defined by the Project Lead (id, slug, name, role, initials, avatar, available, location, bio, skills, projects, links)
    • Collect each teammate’s information via the group chat and fill in all 5 objects
    • Source or confirm avatar image URLs from each person
    • Ensure each id is unique (e.g. DEV-001 through DEV-005) and each slug is URL-safe: lowercase and hyphens only

Deliverable:  A complete, accurate data.js that both pages can import and trust.

--------------------------------------------------------------------------------------------
4. Developer Data Shape
Each team member fills in their own object in data.js. The Project Lead defines this shape upfront so there is no ambiguity. The id field is used in the URL (?dev=DEV-001) to avoid any issues if two developers share the same name. All fields are required — use an empty string or empty array if information is not available yet.

export const developers = [
  {
    id:        "DEV-001",            // unique — used in the URL
    slug:      "your-name",           // lowercase, hyphens only
    name:      "Your Full Name",
    role:      "Your Role",
    initials:  "YN",                 // shown if no avatar URL
    avatar:    "https://...",         // or empty string ""
    available: true,                 // or false
    location:  "City, Country",
    bio:       "Your bio here.",
    skills:    ["Skill 1", "..."],
    projects:  [{ name: "", desc: "", tech: [] }],
    links:     { github: "", linkedin: "", portfolio: "" }
  }
]
