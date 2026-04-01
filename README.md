<div align="center">
  <img src="app/icon.png" alt="Logo" width="56" height="48">
  <h3 align="center">ademcan.dev</h3>
  <p align="center">
    Making the complex feel simple.
  </p>
</div>

---

This repository contains the source code for the personal digital ecosystem of Adem Can Certel. It is not merely a portfolio; it is a meticulously engineered space where code, design, and photography intersect. The architecture is built with an uncompromising focus on typography, precise whitespace, and invisible design.

### The Foundation

Precision tools selected for speed, aesthetic control, and absolute reliability.

- **Framework: Next.js**
  Utilizing the App Router for seamless server-side rendering, optimized loading states, and advanced routing capabilities.
- **Styling: Tailwind CSS**
  A utility-first approach to maintain strict design system constraints and pixel-perfect responsiveness without the bloat of traditional stylesheets.
- **Database: Supabase**
  The robust PostgreSQL backend powering the dynamic "Thoughts" timeline and the high-resolution "Photography" archive.
- **Deployment: Vercel**
  Frictionless continuous integration and edge network delivery, ensuring global performance.

### The Architecture

Every directory has a single, definitive responsibility. There is no clutter.

- `app/` 
  The core of the application. Handles the routing matrix, global layouts, and the primary user interface layers.
- `components/` 
  Reusable, atomic UI building blocks. Designed to be stateless where possible, ensuring consistency across the entire digital experience.
- `lib/` 
  The central nervous system. Contains database clients, strict TypeScript definitions, data fetching mechanisms, and core business logic.
- `public/` 
  The vault for static assets, optimized typography files, and uncompressed, high-fidelity photography.

### Live Experience

The production environment is actively maintained and can be experienced at:

**[ademcan.dev](https://ademcan.dev)**

### Initializing the Local Environment

To bring this architecture to life on your local machine, execute the following sequence precisely.

**Clone the Repository**

Pull the source code to your local drive.

```bash
git clone https://github.com/ademcnrtl/my-website.git
cd my-website
npm install
npm run dev
```