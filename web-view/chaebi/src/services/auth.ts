import axios, { isAxiosError } from 'axios'
import useUserStore from '@/stores/useUserStore'
import { handleApiError } from '@/utils/errorHandler'

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
      console.error('Failed to verify enter code')
      throw new Error('Verification failed')
    }
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
