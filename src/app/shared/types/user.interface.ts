import {IRole} from './role.interface'
import {IPermission} from './permission.interface'

export interface IUser {
  id: number
  username: string
  email: string
  comment: string | null
  avatar: string | null
  status: number
  roles: IRole[]
  permissions: IPermission[]
}

export interface IUserReset {
  email: string
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
