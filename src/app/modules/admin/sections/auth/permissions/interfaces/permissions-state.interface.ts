import {IPermission} from 'src/app/shared/types/permission.interface'

export interface IPermissionsState {
  isLoading: boolean
  error: string | null
  items: IPermission[]
  count: number
}
