import axios from 'axios'

export async function verifyEnterCode(enterCode: string) {
  try {
    const response = await axios.post('/api/recipient/enter', { enterCode })
    return response
  } catch (error) {
    console.error('Error occurred while verifying enter code', error)
    throw error
  }
}
