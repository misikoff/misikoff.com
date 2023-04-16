// declare var apstag: any

// interface Window {
//   googletag: googletag.Googletag | { cmd: any[] }
// }

type FrontMatter = {
  title: string
  date: string
  description: string
  tags: string[]
  thumbnailUrl: string
  title: string
  readingTime?: { time: number }
  numbers?: ?{ [key: string]: number }
  wordCount?: number
}

type Post = {
  frontMatter: FrontMatter
  slug: string
  //   author: string
  //   content: string
  //   ogImage: string
  //   coverImage: string
}
