import {publicApi} from './instance';

export interface SmsCertRequest {
  phoneNum: string;
}

export interface SmsCertResponse {
  status: number;
}

export const sendSmsCertRequest = async (
  data: SmsCertRequest,
): Promise<SmsCertResponse | null> => {
  try {
    console.log('Sending SMS cert request with data:', data); // 요청 전에 데이터 로깅

    const response = await publicApi.post<SmsCertResponse>('/api/sms/cert', data);

    console.log('SMS cert request successful:', response); // 성공적으로 응답을 받은 경우
    return response;
  } catch (error) {
    console.log('Error sending SMS cert request:', error); // 에러가 발생한 경우
    return null;
  }
};

export interface SmsVerifyRequest {
  phoneNum: string;
  code: string;
}

export interface SmsVerifyResponse {
  status: number;
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
    console.log('SMS verification response:', response); // 디버깅용 로그
    return response;
  } catch (error) {
    console.log('Error sending SMS verification request:', error);
    return null;
  }
};

export interface SigninRequest {
  phone: string;
}

export interface SigninResponse {
  status: number;
}

export const sendSigninRequest = async (
  data: SigninRequest,
): Promise<SigninResponse | null> => {
  try {
    console.log('Sending Signin request with data:', data);
    const response = await publicApi.post<SigninResponse>('/api/users/login', data);
    console.log('Signin response:', response);
    return response;
  } catch (error) {
    console.log('Error sending Signin request:', error);
    return null;
  }
};

export interface SignupRequest {
  phone: string;
  name: string;
  fcmToken: string;
}

export interface SignupResponse {
  status: number;
}

export const sendSignupRequest = async (
  data: SignupRequest,
): Promise<SignupResponse | null> => {
  try {
    console.log('Sending Signup request with data:', data);
    const response = await publicApi.post<SignupResponse>(
      '/api/users/signup',
      data,
    );
    console.log('Signup response:', response);
    return response;
  } catch (error) {
    console.log('Error sending Signup request:', error);
    return null;
  }
};

export interface NoticeRequest {
  push: boolean;
}

export interface NoticeResponse {
  status: number;
}

export const sendNoticeRequest = async (
  data: NoticeRequest,
): Promise<NoticeResponse | null> => {
  try {
    console.log('Sending Notice request with data:', data);
    const response = await publicApi.post<NoticeResponse>(
      '/api/users/setting',
      data,
    );
    console.log('Notice response:', response);
    return response;
  } catch (error) {
    console.log('Error sending Notice request:', error);
    return null;
  }
};