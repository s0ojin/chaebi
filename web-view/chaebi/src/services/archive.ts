import axios from 'axios'
import { Letter, GalleryItem } from '@/types/archive'

export async function fetchLetter(id: number): Promise<Letter> {
  try {
    const response = await axios.get<Letter>(`/api/letter/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching letter:', error)
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
    console.error('Error fetching gallery:', error)
    throw error
  }
}
