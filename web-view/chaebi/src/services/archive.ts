import axios from 'axios'
import { PhotoItem } from '@/types/archive'

export async function getArchivePhotos(userId: number): Promise<PhotoItem[]> {
  const response = await axios.get(`/api/archives/${userId}/photos`)
  return response.data
}

export async function getArchiveLetter(userId: number) {
  const response = await axios.get(`/api/archives/${userId}/letter`)
  return response.data
}
