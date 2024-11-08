import {Remain} from '../types/remain';
import {privateApi, publicApi} from './instance';

export const postSaveRemain: (
  payload: Remain,
  recipientId: number,
) => Promise<string> = async (payload: Remain, recipientId: number) => {
  const response = await publicApi.post(
    `/api/letter/${recipientId}/update`,
    payload,
  );
  return response.data;
};
