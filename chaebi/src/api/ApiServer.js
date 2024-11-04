import { api, userApi } from './Index'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { jwtDecode } from "jwt-decode"


// 공통된 AbortController와 타임아웃 설정 로직을 함수로 분리
const createAbortController = (timeout) => {
  const abortController = new AbortController()
  setTimeout(() => abortController.abort(), timeout)
  return abortController
}

// AI 분석 서버 확인
const aiGet = async () => {
  const abortController = createAbortController(3000);
  try {
    const apiInstance = await api()
    const response = await apiInstance.get('/api-ai', { signal: abortController.signal });
    console.log(response.data);
  } catch (error) {
    if (abortController.signal.aborted) {
      console.log('api-ai 점수 get 실패');
    } else {
      console.log('API 호출 중 오류', error);
    }
  }
}

// exerciseId에 맞는 AI 분석 결과 Post로 가져오기 
const aiPost = async (exerciseId) => {
  const abortController = createAbortController(3000);
  try {
    const apiInstance = await api()
    const response = await apiInstance.post(`/api-ai`, {exerciseId}, { signal: abortController.signal} )
    console.log('ai Post :', response.data)
    return response.data
  } catch (error) {
    if (abortController.signal.aborted) {
      console.log('서버 잘 작동');
    } else {
      console.log('API 호출 중 오류', error);
    }
  }
}


// video 서버 열려있는지 확인
const healthGet = async () => {
  const abortController = createAbortController(3000);
  try {
    const apiInstance = await api()
    const response = await apiInstance.get('/api-health', { signal: abortController.signal });
    console.log(response.data);
  } catch (error) {
    if (abortController.signal.aborted) {
      console.log('서버 잘 작동');
    } else {
      console.log('API 호출 중 오류', error);
    }
  }
}

// 안씀 
const healthPost = async (msg) => {
  const abortController = createAbortController(3000)
  try {
    const apiInstance = await api()
    const response = await apiInstance.post('/api-health', {msg}, { signal: abortController.signal })
    console.log(response.data.msg)
  } catch (error) {
    if (abortController.signal.aborted) {
      console.log('api-health 점수 post 실패')
    } else {
      console.log('API 호출 중 오류', error)
    }
  }
}

const loginPost = async (userId, password, navigation) => {
  try {
    const userApiInstance = await userApi()
    const response = await userApiInstance.post('/api-member/login', {
      userId,
      password,
    })
    console.log(response.data)
    if (response.status === 200) {
      const token = response.headers.authorization
      await AsyncStorage.setItem('userToken', token)
      await AsyncStorage.setItem('userId', userId)

      if (token) {
        const bodyTk = String(token).split(" ");
        const decodedToken = jwtDecode(bodyTk[1])
        const userName = decodedToken["memberName"]
        await AsyncStorage.setItem("memberName", userName)
      } else {
        console.log("No token found");
      }
      navigation.navigate('Home')
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  } catch (error) {
    console.error('Error during login:', error)
    Alert.alert('앗!', '아이디 또는 비밀번호가 올바르지 않습니다.')
  }
}

// server에 있는 동영상을 저장한다. 
const videoGet = async () => {
  const abortController = createAbortController(3000)
  try {
    const apiInstance = await api()
    const response = await apiInstance.get(`/api-file`, { signal: abortController.signal })
    // console.log(response.data)
    return response.data
  } catch (error) {
    if (abortController.signal.aborted) {
      console.log('비디오 데이터 get 실패')
    } else {
      console.log('API 호출 중 오류', error)
    }
  }
}

export { 
  aiGet, 
  aiPost, 
  healthGet, 
  healthPost, 
  loginPost, 
  videoGet,
}
