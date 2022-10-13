import {IPermission} from 'src/app/shared/interfaces/permission.interface'

export interface IPermissionsState {
  isLoading: boolean
  error: string | null
  // item: IPermission | null
  items: IPermission[]
  count: number
  itemDialog: boolean
  itemDialogView: boolean
  itemDialogDelete: boolean
  submitted: boolean
}
