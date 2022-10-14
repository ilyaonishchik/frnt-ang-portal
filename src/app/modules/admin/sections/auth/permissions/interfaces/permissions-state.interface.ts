import {IPermissions} from './permissions.interface'

export interface IPermissionsState {
  isLoading: boolean
  error: string | null
  data: IPermissions | null
  // items: IPermission[]
  // count: number
  itemDialog: boolean
  itemDialogView: boolean
  itemDialogDelete: boolean
  submitted: boolean
}
