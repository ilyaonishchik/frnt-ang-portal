import {IPermission} from './permission.interface'

export interface IRole {
  id: number
  code: string
  name: string
  comment: string | null
  status: number
  permissions: IPermission[]
}

export interface IRoleSave {
  code: string
  name: string
  comment: string | null
  status: number
  permissions: number[]
}
