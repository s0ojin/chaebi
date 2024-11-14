import { Recipient } from '../screens/Remain';
import {Remain} from '../types/remain';
import {privateApi, publicApi} from './instance';

export interface Letter {
  id: number;
  content: string;
  lastModifiedDate: string;
  recipient: Recipient
  sort: string;
}

export const postSaveRemain: (
  payload: Remain,
  recipientId: number,
) => Promise<string> = async (payload: Remain, recipientId: number) => {
  const response = await privateApi.post(
    `/api/letter/${recipientId}/update`,
    payload,
  );
  return response.data;
};

export const getLetter: (
  recipientId: number,
) => Promise<Letter> = async (recipientId: number) => {
  const response = await privateApi.get(
    `/api/letter/${recipientId}`,
  );
  return response.data;
};
