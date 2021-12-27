// declare var apstag: any

// interface Window {
//   googletag: googletag.Googletag | { cmd: any[] }
// }

type Post = {
  frontMatter: {
    title: string
    date: string
    description: string
    tags: string[]
    thumbnailUrl: string
    title: string
  }
  slug: string
  //   author: string
  //   content: string
  //   ogImage: string
  //   coverImage: string
}
