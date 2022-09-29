import {IPermission, IRole} from '../../types/user'

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

export interface IUserSave {
  username: string
  email: string
  comment: string | null
  avatar: string | null
  status: number
  roles: number[]
  permissions: number[]
}
