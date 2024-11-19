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

type Recipient = {
  phoneNumber: string;
  recipientId: number;
  recipientName: string;
};

export type SelectedAppMediaType = {
  id: number;
  fileUrl: string;
  fileType: string;
  fileName: string;
  createdDate: string;
  recipients: Recipient[];
};

export type Media = {
  id: number;
  fileUrl: string;
  fileType: 'IMAGE' | 'VIDEO';
  fileName: string;
  createdDate: string;
  recipients: Recipient[];
};

export type AlbumListRes = {
  content: Media[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: false;
};

export type AlbumListResWithHeight = Omit<AlbumListRes, 'content'> & {
  content: (Media & {height: number})[];
};

export type UploadMediaListReq = {
  files: {
    uri: string;
    type: string;
    name: string;
  }[];
  data: {
    recipientIds: number[];
    location: (string | null)[];
    capturedTime: string[];
  };
};
