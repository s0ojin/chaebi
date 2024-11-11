import {publicApi} from './instance';

export interface SmsCertRequest {
  phoneNumber: string;
}

export interface SmsCertResponse {
  success: boolean;
  message: string;
}

export const sendSmsCertRequest = async (
  data: SmsCertRequest,
): Promise<SmsCertResponse | null> => {
  try {
    console.log('Sending SMS cert request with data:', data); // 요청 전에 데이터 로깅

    const response = await publicApi.post<SmsCertResponse>(
      '/api/sms/cert',
      data,
    );

    console.log('SMS cert request successful:', response.data); // 성공적으로 응답을 받은 경우
    return response.data;
  } catch (error) {
    console.log('Error sending SMS cert request:', error); // 에러가 발생한 경우
    return null;
  }
};

export interface SmsVerifyRequest {
  phoneNumber: string;
  authCode: string;
}

export interface SmsVerifyResponse {
  success: boolean;
  message: string;
}

export const sendSmsVerifyRequest = async (
  data: SmsVerifyRequest,
): Promise<SmsVerifyResponse | null> => {
  try {
    console.log('Sending SMS verification request with data:', data); // 디버깅용 로그
    const response = await publicApi.post<SmsVerifyResponse>(
      '/api/sms/verify',
      data,
    );
    console.log('SMS verification response:', response.data); // 디버깅용 로그
    return response.data;
  } catch (error) {
    console.log('Error sending SMS verification request:', error);
    return null;
  }
};
