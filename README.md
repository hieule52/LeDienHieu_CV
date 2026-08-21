# Lê Diên Hiếu — Personal Developer & IT Portfolio

> A modern, fast, and accessible developer portfolio & online CV showcasing full-stack web development, software fundamentals, IT helpdesk, and PC hardware capabilities.

---

## 🌟 Overview

This portfolio website is designed for **Lê Diên Hiếu** to apply for roles across:
- **Software Developer** / **Web Developer** (Fresher / Junior)
- **IT Helpdesk** / **IT Support** / **Technical Support** / **IT Technician**

It highlights a unique intersection of skills:
```text
SOFTWARE DEVELOPMENT  +  WEB DEVELOPMENT  +  PC HARDWARE  +  TECHNICAL SUPPORT
```

---

## 🚀 Live Demo & Links

- **Featured Project:** [Tiến Quốc Auto Spa](https://tienquoc-autospa.vercel.app)
- **GitHub:** [github.com/hieule52](https://github.com/hieule52)
- **Email:** [lehieu2900.in@gmail.com](mailto:lehieu2900.in@gmail.com)
- **Phone:** `0328821260`

---

## 🛠️ Tech Stack

### Core Architecture
- **Runtime:** Node.js (v18+)
- **Server Framework:** Express.js
- **Template Engine:** EJS (Modular partials & section architecture)
- **Styling:** Custom CSS with 3-Layer Design Token Architecture (Primitives &rarr; Semantics &rarr; Components)
- **Icons:** Inline SVG & Optimized Vector Glyphs
- **Typography:** Inter (Body/UI) & JetBrains Mono (Code/Terminal)

### Security, Performance & Internationalization
- **Multilingual Support (EN | VI):** Built-in instant language switch with URL query sync (`?lang=vi` / `?lang=en`) and `localStorage` persistence.
- `helmet`: Secure HTTP headers & Content Security Policy (CSP)
- `express-rate-limit`: Rate limiting on standard & API endpoints
- `express-validator`: Server-side sanitization & validation
- Responsive Mobile-First CSS (320px to 1920px+)
- Respects `prefers-reduced-motion`

---

## 📁 Project Structure

```text
profile/
├── src/
│   ├── controllers/
│   │   ├── homeController.js       # Main portfolio data & view rendering
│   │   └── contactController.js    # Contact submission handler
│   ├── routes/
│   │   ├── webRoutes.js            # Web page routes
│   │   └── apiRoutes.js            # API endpoints (/api/contact, /api/github/repos)
│   ├── services/
│   │   └── githubService.js        # GitHub API integration with in-memory caching
│   └── middleware/
│       └── errorHandler.js         # 404 & 500 custom error handlers
├── views/
│   ├── partials/
│   │   ├── head.ejs                # Meta tags, SEO, OpenGraph, JSON-LD, Styles
│   │   ├── navbar.ejs              # Responsive sticky navigation bar
│   │   ├── footer.ejs              # Social links & copyright footer
│   │   └── scripts.ejs             # Deferred ES6 modules
│   ├── sections/
│   │   ├── hero.ejs                # Hero intro with terminal visual & rotator
│   │   ├── about.ejs               # Bio, quick facts & career objective
│   │   ├── expertise.ejs           # What I Can Do (Dev, IT Support, Hardware)
│   │   ├── skills.ejs              # Categorized skills & IT support checklist
│   │   ├── projects.ejs            # Featured real-world projects
│   │   ├── github.ejs              # Open-source public repositories
│   │   ├── education.ejs           # Degree & APTIS B1 certification timeline
│   │   ├── interests.ejs           # Working style & lifestyle interests
│   │   └── contact.ejs             # Contact details & validated form
│   ├── index.ejs                   # Main single-page layout
│   ├── 404.ejs                     # Developer-styled 404 page
│   └── 500.ejs                     # 500 error page
├── public/
│   ├── css/
│   │   ├── variables.css           # Design tokens (colors, spacing, typography)
│   │   ├── base.css                # Reset, typography, utility classes
│   │   ├── components.css          # Cards, buttons, terminal, badges, forms
│   │   └── responsive.css          # Breakpoints (320px – 1920px)
│   ├── js/
│   │   ├── main.js                 # App initialization & form handler
│   │   ├── navigation.js           # Scroll spy & mobile toggle
│   │   └── animations.js           # Scroll reveal & typing rotator
│   ├── images/
│   │   ├── og-image.svg            # Social media share image
│   │   └── project-autospa.svg     # Tiến Quốc Auto Spa preview mockup
│   ├── cv/
│   │   ├── README.md               # CV upload instructions
│   │   └── Le-Dien-Hieu-CV.pdf     # Downloadable PDF Resume
│   ├── favicon.svg                 # Vector favicon (<H/> mark)
│   ├── robots.txt                  # Search engine crawlers config
│   └── sitemap.xml                 # XML sitemap for SEO
├── .env.example                    # Environment variables template
├── app.js                          # Express application entrypoint
└── package.json                    # Project metadata & dependencies
```

---

## ⚡ Installation & Local Development

### 1. Clone & Install Dependencies
```bash
# Clone or navigate to the directory
cd profile

# Install packages
npm install
```

### 2. Environment Configuration
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
# Runs with nodemon for live reload
npm run dev
```
Visit: [http://localhost:3000](http://localhost:3000)

### 4. Run Production Mode
```bash
npm start
```

---

## 📄 CV Setup

To update your downloadable resume:
1. Export your CV to PDF format named `Le-Dien-Hieu-CV.pdf`.
2. Place the file at `public/cv/Le-Dien-Hieu-CV.pdf`.
3. The download button on the website will automatically serve this file.

---

## 🚢 Deployment

Ready for deployment on **Render**, **Railway**, **Fly.io**, or **Vercel**:
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- Ensure `PORT` environment variable is dynamically read via `process.env.PORT || 3000`.

---

## 📬 Contact

- **Name:** Lê Diên Hiếu
- **Email:** [lehieu2900.in@gmail.com](mailto:lehieu2900.in@gmail.com)
- **Phone:** `0328821260`
- **GitHub:** [https://github.com/hieule52](https://github.com/hieule52)

---
*Designed & Developed with modern web best practices for Lê Diên Hiếu.*
