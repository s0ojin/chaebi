import { create } from 'zustand'
import { Letter } from '@/types/archive'

interface ArchiveStore {
  letter: Letter | null
  setLetter: (letter: Letter) => void
}

const useArchiveStore = create<ArchiveStore>((set) => ({
  letter: null,
  setLetter: (letter) => set({ letter }),
}))

export default useArchiveStore
