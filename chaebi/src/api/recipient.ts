import {Recipient} from '../screens/Remain';
import {privateApi} from './instance';

// 조회하기 (등록할 때 편지도 함께 만들지는 백엔드와 상의하기)
export const getRecipient: () => Promise<Recipient[]> = async () => {
  const response = await privateApi.get('/recipient/list');
  return response.data;
};

// 등록하기 (등록할 때 편지도 함께 만들지는 백엔드와 상의하기)
export const postRecipient: (payload: Recipient) => Promise<string> = async (
  payload: Recipient,
) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(payload));
  const response = await privateApi.post('/recipient/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 수정하기 (등록할 때 편지도 함께 만들지는 백엔드와 상의하기)
export const updateRecipient: (payload: Recipient) => Promise<string> = async (
  payload: Recipient,
) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(payload));
  const response = await privateApi.put('/recipient/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// 삭제하기
export const deleteRecipient: (recipientId: number) => Promise<string> = async (
  recipientId: number,
) => {
  const response = await privateApi.delete(`/recipient/${recipientId}`);
  return response.data;
};
