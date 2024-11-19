import {Recipient} from '../screens/Remain';
import {Remain} from '../types/remain';
import {privateApi} from './instance';

export interface Letter {
  id: number;
  content: string;
  lastModifiedDate: string;
  recipient: Recipient;
  sort: 'center' | 'left';
}

export const postSaveLetter: (
  payload: Remain,
  recipientId: number,
) => Promise<string> = async (payload: Remain, recipientId: number) => {
  const response = await privateApi.post(
    `/letter/${recipientId}/update`,
    payload,
  );
  return response.data;
};

export const getSavedLetter: (recipientId: number) => Promise<Letter> = async (
  recipientId: number,
) => {
  const response = await privateApi.get(`/letter/${recipientId}`);
  return response.data;
};
