export type Remain = {
  content: string;
  sort: 'left' | 'center';
};

export type Recipient = {
  id: number;
  name: string;
  phone: string;
  imgUrl: string;
  secretQuestion: string;
  secretAnswer: string;
  lastModified: string;
};
