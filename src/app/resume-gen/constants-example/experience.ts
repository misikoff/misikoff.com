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
  id?: number
}

export const jobs: Job[] = []
