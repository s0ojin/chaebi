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