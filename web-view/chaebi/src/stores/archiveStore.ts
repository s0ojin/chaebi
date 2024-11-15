import { create } from 'zustand'
import axios from 'axios'
import { ArchiveStore, Letter, Theme, MediaItem } from '@/types/archive'

const useArchiveStore = create<ArchiveStore>((set) => ({
  letter: null,
  themes: [],
  mediaItems: [],

  setLetter: (letter) => set({ letter }),
  setThemes: (themes) => set({ themes }),
  setMediaItems: (items) => set({ mediaItems: items }),

  fetchLetter: async (id: string) => {
    try {
      const response = await axios.get(`/api/letter/${id}`)
      set({ letter: response.data })
    } catch (error) {
      console.error('Error fetching letter:', error)
      throw error
    }
  },

  fetchGallery: async () => {
    try {
      const response = await axios.get('/api/gallery/recipientList')
      const { themes, mediaItems } = response.data
      set({ themes, mediaItems })
    } catch (error) {
      console.error('Error fetching gallery:', error)
      throw error
    }
  },
}))

export default useArchiveStore
