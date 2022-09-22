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

export interface IRole {
  id: number
  name: string
}

export interface IPermission {
  id: number
  name1: string
}

export interface IUserInfo {
  id?: number
  username?: string
  email?: string
  comment?: string
  avatar?: string
  status?: number
  roles?: IRole[]
  permissions?: IPermission[]
}
