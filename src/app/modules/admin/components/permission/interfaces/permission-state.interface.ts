import {
  IPermission,
  IPermissionSave,
} from 'src/app/shared/interfaces/permission.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'

export interface IPermissionState {
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: IBackendErrors | null
  item: IPermission | null
  itemSave: IPermissionSave | null
}
