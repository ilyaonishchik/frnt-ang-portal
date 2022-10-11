import {IPermission} from './permission.interface'

export interface IRole {
  id: number
  name: string
  comment: string | null
  status: number
  permissions: IPermission[]
}

export interface IRoleSave {
  name: string
  comment: string | null
  status: number
  permissions: number[]
}
