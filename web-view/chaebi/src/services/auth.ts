import axios from 'axios'
import useUserStore from '@/stores/useUserStore'
import { error } from 'console'

export async function verifyEnterCode(enterCode: string) {
  try {
    const response = await axios.post('/api/recipient/enter', { enterCode })

    if (response.status === 200) {
      const { userInfo, recipientRes } = response.data
      const { setUserInfo, setRecipientRes } = useUserStore.getState()
      setUserInfo(userInfo)
      setRecipientRes(recipientRes)

      return response.data
    } else {
      throw error
    }
  } catch (error) {
    throw error
  }
}
