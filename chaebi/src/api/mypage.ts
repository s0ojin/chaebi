import {privateApi} from './instance';

export const postLogoutUser: () => Promise<string> = async () => {
  const response = await privateApi.post('/users/logout');
  return response.data;
};

export const deleteResignUser: () => Promise<string> = async () => {
  const response = await privateApi.delete('/users/quit');
  return response.data;
};

export const getUsersAlert: () => Promise<boolean> = async () => {
  const response = await privateApi.get('/users/ispush');
  return response.data;
};

export const postUsersAlert: (value: boolean) => Promise<string> = async (
  value: boolean,
) => {
  const response = await privateApi.post(`/users/setting?push=${value}`);
  return response.data;
};
