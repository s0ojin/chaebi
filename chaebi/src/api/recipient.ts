import { Recipient } from '../screens/Remain';
import {privateApi, publicApi} from './instance';

// 조회하기 (등록할 때 편지도 함께 만들지는 백엔드와 상의하기)
export const getRecipient: ( 
  ) => Promise<Recipient[]> = async () => {
    const response = await publicApi.get(
      `api/recipient/list`,
    );
    return response.data;
  };

// 등록하기 (등록할 때 편지도 함께 만들지는 백엔드와 상의하기)
export const postRecipient: (
    payload: Recipient
  ) => Promise<string> = async (payload: Recipient) => {
    const response = await privateApi.post(
      `/api/recipient/create`,
      payload,
    );
    return response.data;
  };

// 삭제하기
export const deleteRecipient: (
    recipientId: number,
  ) => Promise<string> = async (recipientId: number) => {
    const response = await publicApi.delete(
      `/api/recipient/${recipientId}`
    );
    return response.data;
  };