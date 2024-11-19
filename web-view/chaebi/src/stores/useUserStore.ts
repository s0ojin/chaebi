import { create } from 'zustand'
import { useEffect } from 'react'
import { UserInfo, RecipientRes } from '@/types/user'

interface UserStore {
  userInfo: UserInfo | null
  recipientRes: RecipientRes | null
  setUserInfo: (userInfo: UserInfo) => void
  setRecipientRes: (recipientRes: RecipientRes) => void
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  recipientRes: null,
  setUserInfo: (userInfo) => {
    set({ userInfo })
    if (typeof window !== 'undefined') {
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  setRecipientRes: (recipientRes) => {
    set({ recipientRes })
    if (typeof window !== 'undefined') {
      localStorage.setItem('recipientRes', JSON.stringify(recipientRes))
    }
  },
}))

export function useInitializeUserStore() {
  const setUserInfo = useUserStore((state) => state.setUserInfo)
  const setRecipientRes = useUserStore((state) => state.setRecipientRes)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserInfo = localStorage.getItem('userInfo')
      const storedRecipientRes = localStorage.getItem('recipientRes')

      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo))
      }
      if (storedRecipientRes) {
        setRecipientRes(JSON.parse(storedRecipientRes))
      }
    }
  }, [setUserInfo, setRecipientRes])
}

export default useUserStore
