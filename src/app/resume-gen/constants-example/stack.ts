type TechStack = {
  id: string
  category: string
  technologies: string[]
}

const frontendStack: TechStack = {
  id: 'frontend-stack',
  category: 'Frontend',
  technologies: [
    'JavaScript',
    'TypeScript',
    'React',
    'React Native',
    'Next.js',
    'Tailwind CSS',
    'TanStack Query',
    'Motion',
  ],
}

const backendStack: TechStack = {
  id: 'backend-stack',
  category: 'Backend',
  technologies: ['Python', 'PostgreSQL', 'Drizzle ORM', 'GraphQL'],
}

const deploymentStack: TechStack = {
  id: 'deployment-stack',
  category: 'Deployment & Infrastructure',
  technologies: ['Vercel', 'GitHub Actions', 'Doppler', 'Expo'],
}

const toolsStack: TechStack = {
  id: 'tools-stack',
  category: 'Tools',
  technologies: ['VS Code', 'GitHub', 'Linear', 'GitHub Copilot', 'ChatGPT'],
}

export const stackComponents: TechStack[] = [
  frontendStack,
  backendStack,
  deploymentStack,
  toolsStack,
]
