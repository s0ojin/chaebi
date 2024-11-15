import axios from 'axios'
import { Letter } from '@/types/archive'

export async function fetchLetter(id: number): Promise<Letter> {
  try {
    const response = await axios.get<Letter>(`/api/letter/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching letter:', error)
    throw error
  }
}
