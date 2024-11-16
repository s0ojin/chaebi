import {AlbumListRes, Media, UploadMediaListReq} from '../types/album';
import {Recipient} from '../types/remain';
import {privateApi} from './instance';

export const getMediaList: () => Promise<AlbumListRes> = async () => {
  const response = await privateApi.get(`/gallery/userList?page=${0}`);
  return response.data;
};

export const postUploadMediaList: (
  payload: UploadMediaListReq,
) => Promise<Media> = async payload => {
  const formData = new FormData();

  payload.files.forEach(file => {
    formData.append('files', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });
  });

  formData.append('data', JSON.stringify(payload.data));

  const response = await privateApi.post('/gallery/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getRecipientList: () => Promise<Recipient[]> = async () => {
  const response = await privateApi.get('/recipient/list');
  return response.data;
};
