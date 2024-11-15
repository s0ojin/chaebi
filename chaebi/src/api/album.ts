import {AlbumListRes} from '../types/album';
import {privateApi} from './instance';

export const getMediaList: () => Promise<AlbumListRes> = async () => {
  const response = await privateApi.get(`/gallery/userList?page=${0}`);
  return response.data;
};
