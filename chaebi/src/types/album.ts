export type AlbumAccessOptions = 'ALBUM' | 'CAMERA' | 'FILE';

export type SelectedMediaType = {
  fileName: string;
  fileSize: number;
  height: number;
  originalPath: string;
  type: string;
  uri: string;
  width: number;
};
