import axios, { isAxiosError } from 'axios'
import { Letter, GalleryItem } from '@/types/archive'
import { handleApiError } from '@/utils/errorHandler'

export async function fetchLetter(id: number): Promise<Letter> {
  try {
    const response = await axios.get<Letter>(`/api/letter/${id}`)
    return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      handleApiError(error)
    } else {
      console.error('Unknown error:', error)
      alert('알 수 없는 에러가 발생했습니다.')
    }
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
    if (isAxiosError(error)) {
      handleApiError(error)
    } else {
      console.error('Unknown error:', error)
      alert('알 수 없는 에러가 발생했습니다.')
    }
    throw error
  }
}
