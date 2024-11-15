export type Theme = {
  id: number
  name: string
  images: string[]
}

export type MasonryItem = {
  uri: string
  id: string
  height: number
}

export type Letter = {
  id: number
  content: string
  userId: number
  recipient: {
    id: number
    name: string
    phone: string
    imgUrl: string
    secretQuestion: string
    secretAnswer: string
    lastModified: string | null
  }
  lastModifiedDate: string
  sort: string
}
