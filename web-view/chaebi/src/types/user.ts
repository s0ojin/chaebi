export interface UserInfo {
  userId: number
  userName: string
  phoneNumber: string
}

export interface RecipientRes {
  id: number
  name: string
  phone: string
  imgUrl: string
  secretQuestion: string
  secretAnswer: string
  lastModified: string | null
}
