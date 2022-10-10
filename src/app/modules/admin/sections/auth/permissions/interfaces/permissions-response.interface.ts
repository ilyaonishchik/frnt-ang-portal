import {IPermission} from '../../../../../../shared/types/permission.interface'

export interface IPermissionsResponse {
  records: number
  results: IPermission[]
}
