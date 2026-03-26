# Talent Hire — Developer Talent Board

**A responsive, dynamic developer profile board built with HTML, Tailwind CSS v4, and Vanilla JavaScript.**  

---

## Overview
Talent Hire displays developer profiles as cards on the homepage. Clicking a card navigates to a reusable profile page, dynamically populated with the selected developer’s details using JavaScript.  

- **Pages:** `index.html` (cards) | `profile.html` (profile)  
- **Navigation:** Query string routing (`?dev=DEV-001`)  
- **Theme:** Luxury white-gray-blue color scheme, responsive and modern  

---

## Tech Stack
- **HTML5** — semantic markup  
- **Tailwind CSS v4 (CLI)** — utility-first styling  
- **Vanilla JavaScript (ES Modules)** — dynamic rendering and routing  

---

## File Structure
project/
- ├── index.html ← Cards listing page
- ├── profile.html ← Single profile page
- ├── data.js ← Developer objects (source of truth)
- ├── app.js ← Render and routing logic
- ├── src/input.css ← Tailwind entry point
- └── src/output.css ← Compiled CSS (do not edit)

## Key Features
- Dynamic rendering of cards and profile details from `data.js`  
- Avatar fallback to initials for missing images  
- Responsive, multi-column grid (mobile → desktop)  
- Hover effects and subtle transitions using Tailwind  
- Graceful redirect for invalid or missing `id`  

---
git clone https://github.com/Blockfuse-TEAM-iv/talent-hire.git
cd talent-hire

# Install dependencies if needed
npm install

# Build Tailwind CSS
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

# Open index.html in your browser
