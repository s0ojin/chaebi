import {publicApi} from './instance';

export interface SendCodeRequest {
  phoneNum: string | null;
}

export const sendSendCodeRequest = async (data: SendCodeRequest) => {
  try {
    console.log('Sending SendCode request with data:', data); // 요청 전에 데이터 로깅
    const response = await publicApi.post('/sms/send', data);
    console.log('SendCode request successful:', response); // 성공적으로 응답을 받을 경우
    return response;
  } catch (error) {
    console.log('Error sending SendCode request:', error); // 에러가 발생한 경우
    return null;
  }
};
