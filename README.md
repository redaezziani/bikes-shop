# 🚲 Bikes Shop - Premium Cargo Bikes E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)

![Strapi](https://img.shields.io/badge/Strapi-CMS-8E75FF?style=for-the-badge&logo=strapi&logoColor=white)
![Mapbox](https://img.shields.io/badge/Mapbox-GL_JS-000000?style=for-the-badge&logo=mapbox&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.90-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5.0-764ABC?style=for-the-badge)

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

<p align="center">
  <strong>A modern, high-performance e-commerce platform for premium cargo bikes, built with Next.js 16 and featuring automated CI/CD deployment.</strong>
</p>

[Live Demo](https://alongweride.com) • [Report Bug](https://github.com/redaezziani/bikes-shop/issues) • [Request Feature](https://github.com/redaezziani/bikes-shop/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development](#-development)
- [Deployment](#-deployment)
- [Docker](#-docker)
- [Project Structure](#-project-structure)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Bikes Shop is a cutting-edge e-commerce platform specifically designed for selling premium front-loader cargo bikes in Dubai and the UAE. Built with modern web technologies, it offers an exceptional user experience with lightning-fast page loads, interactive maps, and seamless content management.

### Key Highlights

- ⚡ **Built with Next.js 16** - Leveraging the latest features including Turbopack and App Router
- 🚀 **Blazing Fast** - Optimized build process with ISR (Incremental Static Regeneration)
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS 4
- 🗺️ **Interactive Maps** - Mapbox integration for route visualization
- 📱 **Mobile-First** - Fully responsive across all devices
- 🔄 **Real-time Updates** - TanStack Query for efficient data fetching
- 🐳 **Containerized** - Docker-ready with optimized multi-stage builds
- 🤖 **Auto-Deploy** - GitHub Actions CI/CD to VPS with health checks

---

## ✨ Features

### Customer Features

- 🛍️ **Product Catalog** - Browse premium cargo bikes with detailed specifications
- 📦 **Product Details** - Rich product pages with image galleries and markdown descriptions
- 🗺️ **Route Explorer** - Discover family-friendly cycling routes with GPX visualization
- 📝 **Blog** - Educational content about cycling, maintenance, and UAE routes
- 🛒 **Order System** - Streamlined ordering process with TanStack Query
- 📱 **Responsive Design** - Seamless experience on all devices
- 🎥 **Video Integration** - YouTube integration for product demonstrations
- 📍 **Location Services** - Mapbox-powered interactive route maps

### Admin Features

- 📊 **Headless CMS** - Powered by Strapi for flexible content management
- 🖼️ **Media Management** - Optimized image handling with Next.js Image
- ✍️ **Markdown Support** - Rich text content with React Markdown
- 🔄 **Content Revalidation** - ISR with configurable cache times
- 📦 **Bundle Analysis** - Built-in bundle analyzer for performance monitoring

### Developer Features

- 🔷 **TypeScript** - Full type safety across the codebase
- 🎨 **Tailwind CSS 4** - Latest version with PostCSS integration
- 🧩 **Modular Architecture** - Clean separation of concerns
- 🗃️ **State Management** - Zustand for lightweight global state
- ✅ **ESLint** - Code quality and consistency
- 🐳 **Docker Support** - Production-ready containerization
- 🔄 **CI/CD Pipeline** - Automated testing, building, and deployment

---

## 🛠️ Tech Stack

### Frontend

| Technology                                    | Version | Purpose                                       |
| --------------------------------------------- | ------- | --------------------------------------------- |
| [Next.js](https://nextjs.org/)                | 16.0.7  | React framework with App Router and Turbopack |
| [React](https://react.dev/)                   | 19.2.0  | UI library                                    |
| [TypeScript](https://www.typescriptlang.org/) | 5.x     | Type safety                                   |
| [Tailwind CSS](https://tailwindcss.com/)      | 4.x     | Utility-first CSS framework                   |
| [Motion](https://motion.dev/)                 | 12.23   | Animation library                             |
| [Swiper](https://swiperjs.com/)               | 12.0    | Touch slider component                        |

### Data Management

| Technology                                   | Version | Purpose                   |
| -------------------------------------------- | ------- | ------------------------- |
| [TanStack Query](https://tanstack.com/query) | 5.90    | Data fetching and caching |
| [Zustand](https://zustand-demo.pmnd.rs/)     | 5.0     | State management          |
| [Axios](https://axios-http.com/)             | 1.13    | HTTP client               |

### Content & Media

| Technology                                                   | Version | Purpose              |
| ------------------------------------------------------------ | ------- | -------------------- |
| [Strapi CMS](https://strapi.io/)                             | -       | Headless CMS backend |
| [React Markdown](https://github.com/remarkjs/react-markdown) | 10.1    | Markdown rendering   |
| [Mapbox GL](https://www.mapbox.com/)                         | 3.17    | Interactive maps     |
| [React YouTube](https://www.npmjs.com/package/react-youtube) | 10.1    | YouTube player       |

### UI Components & Icons

| Technology                                                                | Version | Purpose             |
| ------------------------------------------------------------------------- | ------- | ------------------- |
| [@tabler/icons-react](https://tabler-icons.io/)                           | 3.35    | Icon library        |
| [Sonner](https://sonner.emilkowal.ski/)                                   | 2.0     | Toast notifications |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | 0.5     | Prose styling       |

### DevOps & Tooling

| Technology                                                                   | Version | Purpose              |
| ---------------------------------------------------------------------------- | ------- | -------------------- |
| [Docker](https://www.docker.com/)                                            | -       | Containerization     |
| [GitHub Actions](https://github.com/features/actions)                        | -       | CI/CD pipeline       |
| [ESLint](https://eslint.org/)                                                | 9.x     | Code linting         |
| [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) | 16.0    | Bundle size analysis |

---

## 🏗️ Architecture

The application follows a modern, scalable architecture:

```
┌─────────────────┐
│   Next.js 16    │
│   (Frontend)    │
└────────┬────────┘
         │
    ┌────▼────┐
    │ TanStack│
    │  Query  │
    └────┬────┘
         │
    ┌────▼────────┐
    │ Strapi CMS  │
    │  (Backend)  │
    └─────────────┘
```

- **Frontend**: Next.js 16 with App Router and Server Components
- **Data Layer**: TanStack Query for server state management
- **CMS**: Headless Strapi for content management
- **Maps**: Mapbox GL for interactive route visualization
- **Deployment**: Docker containers orchestrated via GitHub Actions

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** 10.x or higher (comes with Node.js)
- **Docker** (optional, for containerized deployment) ([Download](https://www.docker.com/))
- **Git** ([Download](https://git-scm.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/redaezziani/bikes-shop.git
   cd bikes-shop
   ```

2. **Install dependencies**

   ```bash
   npm ci
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration (see [Environment Variables](#environment-variables))

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Strapi CMS Configuration
NEXT_PUBLIC_STRAPI_URL=https://api.alongweride.com
NEXT_PUBLIC_STRAPI_API_URL=https://api.alongweride.com/api
NEXT_PUBLIC_STRAPI_API_KEY=your_strapi_api_key_here

# Mapbox Configuration
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here

# Optional: Bundle Analyzer
ANALYZE=false
```

#### Getting API Keys

- **Strapi API Key**: Generated from your Strapi admin panel under Settings → API Tokens
- **Mapbox Token**: Create a free account at [mapbox.com](https://www.mapbox.com/) and generate an access token

---

## 💻 Development

### Available Scripts

| Command                      | Description                                              |
| ---------------------------- | -------------------------------------------------------- |
| `npm run dev`                | Start development server with hot reload                 |
| `npm run build`              | Build production-ready application                       |
| `npm start`                  | Start production server (requires `npm run build` first) |
| `npm run lint`               | Run ESLint to check code quality                         |
| `ANALYZE=true npm run build` | Build with bundle analyzer                               |

### Development Workflow

1. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

   - Follow the existing code structure
   - Use TypeScript for type safety
   - Follow the component patterns

3. **Test your changes**

   ```bash
   npm run build
   npm start
   ```

4. **Lint your code**

   ```bash
   npm run lint
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- Use **TypeScript** for all new files
- Follow **React Hooks** patterns
- Use **Tailwind CSS** utilities instead of custom CSS
- Keep components **small and focused**
- Use **async/await** for asynchronous operations
- Write **descriptive variable and function names**
- Add **JSDoc comments** for complex functions

---

## 🚀 Deployment

### Automated Deployment (GitHub Actions)

The project uses GitHub Actions for automated CI/CD. On every push to the `main` branch:

1. **Build** - Docker image is built with all dependencies
2. **Push** - Image is pushed to GitHub Container Registry
3. **Deploy** - VPS pulls the new image and deploys
4. **Health Check** - Automated health check with rollback on failure
5. **Notify** - Telegram notification with deployment status

### Manual Deployment

#### Deploy to VPS

1. **Build the Docker image**

   ```bash
   docker build -t bikes-shop:latest \
     --build-arg NEXT_PUBLIC_STRAPI_URL=$STRAPI_URL \
     --build-arg NEXT_PUBLIC_STRAPI_API_URL=$STRAPI_API_URL \
     --build-arg NEXT_PUBLIC_STRAPI_API_KEY=$STRAPI_API_KEY \
     --build-arg NEXT_PUBLIC_MAPBOX_TOKEN=$MAPBOX_TOKEN \
     .
   ```

2. **Run the container**
   ```bash
   docker run -d \
     -p 3000:3000 \
     --name bikes-shop \
     --restart unless-stopped \
     bikes-shop:latest
   ```

#### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Make sure to set environment variables in your Vercel project settings.

---

## 🐳 Docker

### Multi-Stage Build

The Dockerfile uses a multi-stage build for optimal image size:

- **Stage 1 (Builder)**: Installs dependencies and builds the application
- **Stage 2 (Runtime)**: Copies only production files, runs as non-root user

### Build Arguments

The following build arguments are required:

```dockerfile
--build-arg NEXT_PUBLIC_STRAPI_URL=<value>
--build-arg NEXT_PUBLIC_STRAPI_API_URL=<value>
--build-arg NEXT_PUBLIC_STRAPI_API_KEY=<value>
--build-arg NEXT_PUBLIC_MAPBOX_TOKEN=<value>
```

### Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    image: ghcr.io/redaezziani/bikes-shop-nextjs:latest
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000']
      interval: 30s
      timeout: 10s
      retries: 3
```

Run with:

```bash
docker compose up -d
```

---

## 📁 Project Structure

```
bikes-shop/
├── app/                    # Next.js 16 App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── sections/         # Page sections
│   └── layout/           # Layout components
├── lib/                   # Utility functions
│   ├── api/              # API clients
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Helper functions
├── store/                 # Zustand stores
├── types/                 # TypeScript types
├── public/               # Static assets
├── styles/               # Global styles
├── .github/              # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml    # CI/CD pipeline
├── Dockerfile            # Multi-stage Docker build
├── docker-compose.yml    # Docker Compose config
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── package.json          # Dependencies
```

---

## ⚡ Performance

### Lighthouse Scores

The application achieves excellent Lighthouse scores:

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Optimization Techniques

- **Image Optimization** - Next.js Image component with WebP format
- **Code Splitting** - Automatic route-based splitting
- **ISR** - Incremental Static Regeneration for dynamic content
- **Server Components** - Reduced client-side JavaScript
- **Lazy Loading** - Components loaded on demand
- **Bundle Analysis** - Regular monitoring of bundle size
- **Caching Strategy** - TanStack Query with stale-while-revalidate

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'feat: add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Commit Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Reda Ezziani** - [@redaezziani](https://github.com/redaezziani)

**Project Link**: [https://github.com/redaezziani/bikes-shop](https://github.com/redaezziani/bikes-shop)

**Live Demo**: [https://alongweride.com](https://alongweride.com)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Strapi](https://strapi.io/) - Headless CMS
- [Mapbox](https://www.mapbox.com/) - Maps and location data
- [TanStack Query](https://tanstack.com/query) - Powerful data synchronization
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">

Made with ❤️ by [Reda Ezziani](https://github.com/redaezziani)

⭐ Star this repository if you find it helpful!

</div>
