import { GalleryItem } from '../types/archive'

export function groupByYear(items: GalleryItem[]) {
  return items.reduce(
    (acc, item) => {
      const year = item.capturedDate?.split('-')[0]
      if (year) {
        if (!acc[year]) {
          acc[year] = []
        }
        acc[year].push(item)
      }
      return acc
    },
    {} as Record<string, GalleryItem[]>,
  )
}

export function groupByLocation(items: GalleryItem[]) {
  return items.reduce(
    (acc, item) => {
      if (item.locate) {
        if (!acc[item.locate]) {
          acc[item.locate] = []
        }
        acc[item.locate].push(item)
      }
      return acc
    },
    {} as Record<string, GalleryItem[]>,
  )
}

export function groupByKeyword(items: GalleryItem[], keyword: string) {
  return items.filter((item) => item.keywords.includes(keyword))
}
