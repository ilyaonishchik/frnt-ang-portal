import {IPermission} from 'src/app/shared/interfaces/permission.interface'

export interface IPermissionsResponse {
  records: number
  results: IPermission[]
}
