import {IPermission} from './permission.interface'

export interface IRole {
  id: number
  code: string
  name: string
  comment: string | null
  permissions: IPermission[]
  status: boolean
}

export interface IRoleSave {
  code: string
  name: string
  comment: string | null
  permissions: number[]
  status: boolean
}
