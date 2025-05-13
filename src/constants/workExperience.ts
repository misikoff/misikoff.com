type Job = {
  id: string
  titles: string[]
  description: string
  location: string
  company: string
  startDate: Date
  endDate: Date
  actions: Action[]
}

type Action = {
  stack?: string[]
  text: string
}

const viewportJob: Job = {
  id: 'viewport-senior-software-engineer',
  titles: ['Software Engineer', 'Senior Software Engineer'],
  description:
    'Led frontend architecture, implemented scalable systems, and optimized performance across multi-site deployments.',
  location: 'Remote',
  company: 'Viewport',
  startDate: new Date(), //'June 2018',
  endDate: new Date(), //'May 2025',
  actions: [
    {
      text: 'Architected and led migrations to Next.js for large-scale applications, leveraging App Router, content previews, SSR, SSG, and ISR to maximize performance, scalability, and SEO.',
      stack: ['Next.js', 'React'],
    },
    {
      text: 'Implemented composable GraphQL calls to CMS to optimize caching and page speed.',
      stack: ['GraphQL', 'Contentful'],
    },
    {
      text: 'Created an AI content pipeline using OpenAI API to expand existing content into new forms.',
      stack: ['OpenAI API'],
    },
    {
      text: 'Introduced theming logic for flexible, intuitive customization between sites with modular, reusable frontend components.',
      stack: ['React', 'CSS'],
    },
    {
      text: 'Spearheaded the migration of multiple projects into a unified monorepo, significantly improving development speed, code sharing, and cross-team collaboration.',
      stack: ['Monorepo', 'GitHub Actions'],
    },
    {
      text: 'Implemented client and server components to improve page load speed.',
      stack: ['Next.js'],
    },
    {
      text: 'Set up custom build steps to skip deployments based on markdown in GitHub PR descriptions, reducing deployment queues.',
      stack: ['GitHub Actions'],
    },
    {
      text: 'Implemented automatic release tagging adopted by other engineering teams.',
      stack: ['GitHub Actions'],
    },
    {
      text: 'Rebuilt flagship site from Nuxt.js (Vue.js) SSR to Next.js (React) ISR, resulting in a $40K/month cost reduction and reduced deployment times from 20 to 2 minutes.',
      stack: ['Next.js', 'Vue.js', 'Vercel'],
    },
    {
      text: 'Led the migration from an in-house CMS to Contentful, enabling preview mode with on-demand static regeneration.',
      stack: ['Contentful', 'Next.js'],
    },
    {
      text: 'Managed large data migrations with minimal downtime.',
      stack: ['Python', 'AWS'],
    },
  ],
}

const idealSpotJob: Job = {
  id: 'idealspot-data-solutions-manager',
  titles: ['Data Solutions Manager', 'Software Engineer'],
  description:
    'Led data-oriented project development, client collaboration, and geospatial application architecture.',
  location: 'Austin, TX',
  company: 'IdealSpot',
  startDate: new Date(), //'June 2016',
  endDate: new Date(), //'May 2018',
  actions: [
    {
      text: 'Assembled and led a small team with diverse skillsets to scale data-oriented offerings, executing through client discussions and developing a modular system for custom projects.',
      stack: ['Python', 'Node.js'],
    },
    {
      text: 'Developed and monitored deployment of new features in a complex geospatial web application, focusing on usability-driven redesigns.',
      stack: ['Vue.js', 'Leaflet'],
    },
    {
      text: 'Collaborated with sales and engineering teams to assess client needs and create technical roadmaps for custom geospatial data solutions.',
      stack: ['Python', 'JavaScript'],
    },
    {
      text: 'Conducted exploratory calls with clients to identify project goals and translate complex data requirements into actionable development plans.',
      stack: ['Python', 'Node.js'],
    },
    {
      text: 'Maintained ongoing client relationships post-delivery, providing tailored support and follow-up reports.',
      stack: ['Python', 'Node.js'],
    },
    {
      text: 'Led the integration of modular components to streamline project delivery, reducing development time and skill requirements for future projects.',
      stack: ['Vue.js', 'Node.js', 'Leaflet'],
    },
  ],
}

const snowGaleLabsJob: Job = {
  id: 'snow-gale-labs-founder',
  titles: ['Founder & Lead Software Engineer'],
  description:
    'Shape product vision, architecture, and feature set for web and mobile apps under Snow Gale Labs.',
  location: 'Remote',
  company: 'Snow Gale Labs',
  startDate: new Date(), //'Feb 2025',
  endDate: new Date(), //null,
  actions: [
    {
      text: 'Shape the product vision, user flow, and core feature set, focusing on clarity and utility.',
      stack: ['Product Design', 'UX/UI Design'],
    },
    {
      text: 'Design and build web (React w/ Next.js) and mobile apps (React Native w/ Expo).',
      stack: ['React', 'Next.js', 'React Native', 'Expo'],
    },
    {
      text: 'Architect the backend with Supabase (PostgreSQL).',
      stack: ['Supabase', 'PostgreSQL', 'Node.js'],
    },
    {
      text: 'Build robust, reusable data layers using TypeScript, Drizzle ORM, and TanStack Query.',
      stack: ['TypeScript', 'Drizzle ORM', 'TanStack Query'],
    },
  ],
}

export const jobs: Job[] = [viewportJob, snowGaleLabsJob, idealSpotJob]
