import axios from 'axios'
import { Letter, GalleryItem } from '@/types/archive'

export async function fetchLetter(id: number): Promise<Letter> {
  try {
    const response = await axios.get<Letter>(`/api/letter/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchGallery(
  userId: number,
  recipientId: number,
): Promise<GalleryItem[]> {
  try {
    const response = await axios.post<GalleryItem[]>(
      `/api/gallery/recipientList?userId=${userId}&recipientId=${recipientId}`,
    )
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchFilteredGallery(
  userId: number,
  recipientId: number,
): Promise<{
  christmas: GalleryItem[]
  endstart: GalleryItem[]
  yearClassification: { [key: string]: GalleryItem[] }
  locationClassification: { [key: string]: GalleryItem[] }
  keywordClassification: { [key: string]: GalleryItem[] }
}> {
  try {
    const response = await axios.post(
      `/api/gallery/filterList?userId=${userId}&recipientId=${recipientId}`,
    )
    const {
      filteredSpecialDatesMap = {},
      yearClassification = {},
      locationClassification = {},
      keywordClassification = {},
    } = response.data

    return {
      christmas: filteredSpecialDatesMap.christmas || [],
      endstart: filteredSpecialDatesMap.endstart || [],
      yearClassification,
      locationClassification,
      keywordClassification,
    }
  } catch (error) {
    throw error
  }
}
