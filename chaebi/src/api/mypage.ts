import { publicApi, privateApi } from "./instance";

export const postLogoutUser: () => Promise<string> = async () => {
    const response = await privateApi.post(
      `/api/users/logout`,
    );
    return response.data;
  };

export const deleteResignUser: () => Promise<string> = async () => {
    const response = await privateApi.delete(
      `/api/users/quit`,
    );
    return response.data;
  };

  export const getUsersAlert: () => Promise<boolean> = async () => {
    const response = await privateApi.get(
      `/api/users/ispush`,
    );
    return response.data;
  };

  export const postUsersAlert: (
    value: boolean
  )=> Promise<string> = async (value:boolean) => {
    const response = await privateApi.post(
      `api/users/setting?push=${value}`
    )
    console.log(response)
    return response.data;
  }