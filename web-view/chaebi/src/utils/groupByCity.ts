type Classification = Record<string, { fileUrl: string }[]>
type GroupedImages = Record<string, string[]>

export function groupByCity(
  locationClassification: Classification,
): GroupedImages {
  return Object.keys(locationClassification).reduce((acc, location) => {
    // '시' 단위 추출 및 접두사 제거
    const match = location.match(/([가-힣]+시|[가-힣]+도)/)
    const groupKey = match ? match[0] : location

    if (!acc[groupKey]) {
      acc[groupKey] = []
    }

    acc[groupKey].push(
      ...locationClassification[location].map((item) => item.fileUrl),
    )
    return acc
  }, {} as GroupedImages)
}
