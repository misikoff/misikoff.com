type Ethos = {
  id: string
  principle: string
  description: string
}

export const developmentEthos: Ethos[] = [
  {
    id: 'iterative-development',
    principle: 'Iterative Development',
    description:
      'Prototyping and refining based on real-world feedback and analytics.',
  },
  {
    id: 'systems-thinking',
    principle: 'Systems Thinking',
    description:
      'Approaching projects holistically to pinpoint links and dependencies.',
  },
  {
    id: 'cross-functional-collaboration',
    principle: 'Cross-Functional Collaboration',
    description:
      'Aligning engineering with design and product to maintain a unified product vision.',
  },
  {
    id: 'initiative-ownership',
    principle: 'Initiative & Ownership',
    description:
      'Identifying areas for improvement and pitching impactful solutions.',
  },
  {
    id: 'developer-experience',
    principle: 'Developer Experience Improvement',
    description:
      'Recognizing and resolving bottlenecks in developer flow to improve velocity.',
  },
  {
    id: 'clarity-over-complexity',
    principle: 'Clarity Over Complexity',
    description:
      'Promoting thoughtful design and implementation to deliver intuitive experiences.',
  },
  {
    id: 'code-as-communication',
    principle: 'Code as Communication',
    description: 'Writing code with readability in mind.',
  },
]
