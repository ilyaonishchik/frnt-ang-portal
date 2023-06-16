import {IPermission} from './permission.interface'
import {IUser} from '@shared/interfaces/user.interface'

export interface IRole {
  id: number
  code: string
  name: string
  comment: string | null
  status: boolean
}

export interface IRoleFull {
  id: number
  code: string
  name: string
  comment: string | null
  permissions: IPermission[]
  users: IUser[]
  status: boolean
}

export interface IRoleSave {
  code: string
  name: string
  comment: string | null
  permissions: number[]
  users: number[]
  status: boolean
}
