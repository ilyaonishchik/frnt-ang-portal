import {IRole} from '@shared/interfaces/role.interface'
import {IUser} from '@shared/interfaces/user.interface'

export interface IPermission {
  id: number
  code: string
  name: string
  comment: string | null
  status: boolean
}

export interface IPermissionFull {
  id: number
  code: string
  name: string
  comment: string | null
  roles: IRole[]
  users: IUser[]
  status: boolean
}

export interface IPermissionSave {
  code: string
  name: string
  comment: string | null
  roles: number[]
  users: number[]
  status: boolean
}
