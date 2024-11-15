export type AlbumAccessOptions = 'ALBUM' | 'CAMERA' | 'FILE';

export type SelectedLocalMediaType = {
  fileName: string;
  fileSize: number;
  height: number;
  originalPath: string;
  type: string;
  uri: string;
  width: number;
};

export type SelectedAppMediaType = {
  id: number;
  fileUrl: string;
  fileType: string;
  fileName: string;
  createdDate: string;
  recipients: [
    {
      recipientId: number;
      recipientName: string;
      phoneNumber: string;
    },
  ];
};

export type Media = {
  id: number;
  fileUrl: string;
  fileType: 'IMAGE' | 'VIDEO';
  fileName: string;
  createdDate: string;
  recipients: number[];
};

export type AlbumListRes = {
  content: Media[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: false;
};
