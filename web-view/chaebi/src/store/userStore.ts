// store/userStore.ts
import { create } from 'zustand'

interface UserInfo {
  userId: number
  userName: string
  phoneNumber: string
}

interface RecipientRes {
  id: number
  name: string
  phone: string
  imgUrl: string
  secretQuestion: string
  secretAnswer: string
  lastModified: string | null
}

interface UserStore {
  userInfo: UserInfo | null
  recipientRes: RecipientRes | null
  setUserInfo: (userInfo: UserInfo) => void
  setRecipientRes: (recipientRes: RecipientRes) => void
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  recipientRes: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  setRecipientRes: (recipientRes) => set({ recipientRes }),
}))

export default useUserStore
