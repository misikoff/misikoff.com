type Job = {
  id: string
  titles: string[]
  description: string
  location: string
  company: string
  startDate: Date
  endDate: Date | null
  actions: Action[]
  bonusDescriptor?: string
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
  startDate: new Date('06/01/2018'), //'June 2018',
  endDate: new Date('05/01/2025'), //'May 2025',
  actions: [
    {
      text: 'Architected and led migrations to Next.js for large-scale applications, leveraging App Router, content previews, SSR, SSG, and ISR to maximize performance, scalability, and SEO.',
      stack: ['Next.js', 'React'],
    },
    {
      text: 'Built and debugged revalidation relays to ensure prompt content updates across sites and debugged intermittent race conditions to achieve 100% success rate in API calls.',
      stack: ['Next.js', 'React'],
    },
    {
      text: 'Implemented composable GraphQL calls to CMS to optimize caching and page speed.',
      stack: ['GraphQL', 'Contentful'],
    },
    {
      text: 'Created an AI content pipeline with the OpenAI API to expand existing content into new forms.',
      stack: ['OpenAI API'],
    },
    {
      text: 'Introduced theming logic to enable flexible, intuitive, customization between sites. This included modular, reusable frontend components that scaled across our multi-site architecture.',
      stack: ['React', 'CSS'],
    },
    {
      text: 'Implemented experiment infrastructure for reliable A/B testing.',
      stack: ['JavaScript', 'React'],
    },
    {
      text: "Delivered polished UI's and animations both independently and in collaboration with designer partners.",
      stack: ['Framer Motion', 'React'],
    },
    {
      text: 'Spearheaded the migration of multiple projects into a unified monorepo, significantly improving development speed, code sharing, and cross-team collaboration.',
      stack: ['Monorepo', 'GitHub Actions'],
    },
    {
      text: 'Delivered high-performance frontend systems by optimizing bundling, routing, and rendering strategies, resulting in improved load times and user experience.',
      stack: ['Next.js', 'React'],
    },
    {
      text: 'Implemented client and server components to improve page load speed.',
      stack: ['Next.js', 'React'],
    },
    {
      text: 'Collaborated closely with other teams to build powerful, intuitive internal tooling for content editing, including through rich text and markdown.',
      stack: ['React', 'Markdown'],
    },
    {
      text: 'Set up custom build steps to skip deployments based on markdown in GitHub PR descriptions, reducing deployment queues.',
      stack: ['GitHub Actions', 'Markdown'],
    },
    {
      text: 'Implemented automatic release tagging for my team that was subsequently copied over to other parts of the engineering department.',
      stack: ['GitHub Actions'],
    },
    {
      text: 'Developed and improved CI/CD pipelines with automated linting, testing, release tagging, and deployment workflows, accelerating release cycles and increasing code quality.',
      stack: ['GitHub Actions', 'Docker'],
    },
    {
      text: 'Implemented thorough linting strategies, improving code quality and reducing merge conflicts, especially through explicit import ordering logic.',
      stack: ['ESLint', 'Prettier'],
    },
    {
      text: 'Rebuilt flagship site from Nuxt.js (Vue.js) SSR to Next.js (React) ISR, resulting in a $40K/month cost reduction and reduced deployment times from 20 to 2 minutes.',
      stack: ['Next.js', 'Vue.js', 'Vercel'],
    },
    {
      text: 'Led the evaluation and migration of our in-house CMS to Contentful, enabling content editors to use preview mode with on-demand static regeneration.',
      stack: ['Contentful', 'Next.js'],
    },
    {
      text: 'Scaled frontend infrastructure by implementing Doppler to manage environment variables across dozens of sites, reducing friction and configuration errors.',
      stack: ['Doppler', 'Node.js'],
    },
    {
      text: 'Managed multiple large data migrations while ensuring minimal downtime.',
      stack: ['Python', 'AWS'],
    },
    {
      text: 'Worked on high-volume data pipelines (Python) with real-time data, and implemented large imports, exports, and transformations.',
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
  startDate: new Date('06/01/2016'), //'June 2016',
  endDate: new Date('05/01/2018'), //'May 2018',
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
  startDate: new Date('02/01/2025'), //'Feb 2025',
  endDate: null,
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
  bonusDescriptor: 'Side Project',
}

export const jobs: Job[] = [viewportJob, snowGaleLabsJob, idealSpotJob]
