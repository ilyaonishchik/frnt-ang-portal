export interface ICurrentUser {
  id: number
  username: string
  email: string
  comment: string | null
  avatar: string | null
  verify: string | null
  last_login: string | null
  status: number
}
