import {Recipient} from '../screens/Remain';
import {privateApi} from './instance';

export const getRecipientList: () => Promise<Recipient[]> = async () => {
  const response = await privateApi.get('/recipient/list');
  return response.data;
};

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
