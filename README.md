<div align="center">
  <img src="public/icon.png" alt="Logo" width="64" height="64">
  <h1 align="center">ademcan.dev</h1>
  <p align="center">
    <strong>Making the complex feel simple.</strong>
  </p>
</div>

---

### The Vision
This repository houses the source code for the personal digital ecosystem of **Adem Can Certel**. It is not merely a portfolio; it is a meticulously engineered space where code, design, and photography intersect. The architecture is built with an uncompromising focus on typography, precise whitespace, and "invisible" design—ensuring that the technology never gets in the way of the experience.

### The Foundation
Precision tools selected for speed, aesthetic control, and absolute reliability.

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
  Utilizing server-side rendering and dynamic routing for a seamless, instantaneous user flow.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
  A utility-first approach to maintain strict design system constraints and pixel-perfect responsiveness.
- **Database:** [Supabase](https://supabase.com/)
  The robust PostgreSQL backend powering the dynamic "Thoughts" timeline and the "Words" archive.
- **Typography & Rendering:** [React Markdown](https://github.com/remarkjs/react-markdown) & [Prism.js](https://prismjs.com/)
  A custom-tuned engine that renders technical articles with high-fidelity syntax highlighting, mimicking the VS Code environment.

### The Subsystems

#### 1. Words (The Blog)
A sophisticated editorial platform designed for deep dives into engineering and design.
- **Scheduled Publishing:** An automated delivery system using `lte` filtering logic, allowing articles to be prepared in advance and released at a precise timestamp.
- **Custom Interaction (The Clap):** A bespoke micro-interaction engine built with **pure CSS geometry** (Zero SVGs). It features a 5-clap limit per session to maintain the value of feedback.
- **Syntax Highlighting:** Integrated `vscDarkPlus` theme for code blocks, ensuring technical readability is never compromised.

#### 2. Thoughts
A minimalist, real-time timeline for ephemeral ideas, code snippets, and brief observations. Built for friction-less sharing.

#### 3. Photography
A high-resolution archive where the interface recedes to let the visual narrative take center stage, served via Supabase Storage.

### The Architecture
Every directory has a single, definitive responsibility. There is no clutter.

- `app/` - The core application logic, routing matrix, and global layout layers.
- `components/` - Atomic UI building blocks. Stateless, reusable, and visually consistent.
- `lib/` - The central nervous system. Contains database clients, data-fetching logic, and core utilities.
- `types/` - Centralized TypeScript definitions ensuring a type-safe environment across the stack.

### Initializing the Local Environment

To bring this architecture to life on your local machine, execute the following sequence:

**1. Clone & Install**
```bash
git clone https://github.com/ademcnrtl/my-website.git
cd my-website
npm install
```