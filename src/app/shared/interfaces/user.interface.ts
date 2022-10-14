import {IRole} from './role.interface'
import {IPermission} from './permission.interface'

export interface IUser {
  id: number
  username: string
  email: string | null
  comment: string | null
  avatar: string | null
  verify: string | null
  last_login: string | null
  status: number
}

export interface IUserInfo {
  id: number
  username: string
  email: string
  comment: string | null
  avatar: string | null
  status: number
  roles: IRole[]
  permissions: IPermission[]
}

export interface IUserSave {
  username: string
  email: string
  comment: string | null
  avatar: string | null
  status: number
  roles: number[]
  permissions: number[]
}

export interface ICurrentUser {
  id: number
  username: string
  email: string
  comment: string | null
  avatar: string | null
  verify: string | null
  last_login: string | null
  status: number
  roles: IRole[]
  permissions: IPermission[]
}