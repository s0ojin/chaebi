import axios from 'axios'
import useUserStore from '@/stores/userStore'

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
    console.error('Error occurred while verifying enter code', error)
    throw error
  }
}