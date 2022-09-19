export interface IUser {
  id: number
  username: string
  email: string
  comment?: string
  avatar?: string
  verify?: string
  last_login?: string
  status: number
}

export interface IUsers {
  results: IUser[]
  records: number
}
