export interface IUser {
  id: number
  name: string
  email: string
  colorHex: string
  password: string
  refreshToken?: string
}

export interface IUserInfo {
  id: number
  name: string
  email: string
  avatar?: string
}
