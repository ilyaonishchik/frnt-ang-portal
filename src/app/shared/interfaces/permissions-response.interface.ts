import {IPermission} from './permission.interface'

export interface IPermissionsResponse {
  records: number
  results: IPermission[]
}
