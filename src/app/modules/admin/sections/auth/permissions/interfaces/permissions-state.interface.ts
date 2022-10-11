import {IPermission} from 'src/app/shared/interfaces/permission.interface'

export interface IPermissionsState {
  isLoading: boolean
  error: string | null
  items: IPermission[]
  count: number
}
