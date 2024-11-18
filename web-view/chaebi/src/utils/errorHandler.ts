import { AxiosError } from 'axios'

export function handleApiError(error: AxiosError): void {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        alert('잘못된 요청입니다.')
        break
      case 401:
        alert('권한이 없습니다. 로그인 상태를 확인하세요.')
        break
      case 404:
        alert('요청한 정보를 찾을 수 없습니다.')
        break
      case 409:
        alert('이미 존재하는 리소스입니다.')
        break
      case 500:
        alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.')
        break
      default:
        alert(`알 수 없는 에러가 발생했습니다: ${error.response.status}`)
        break
    }
  } else if (error.request) {
    alert('서버가 응답하지 않습니다. 네트워크 상태를 확인하세요.')
  } else {
    alert(`에러가 발생했습니다: ${error.message}`)
  }
}
