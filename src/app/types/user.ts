export interface IUser {
  id: number
  username: string
  email?: string
  comment?: string
  avatar?: string
}

export interface IUserSignIn {
  username: string
  password: string
}

export interface IUserSignUp {
  username: string
  email: string
  password: string
}
export interface IUserReset {
  email: string
}
