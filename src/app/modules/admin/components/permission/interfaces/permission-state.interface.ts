import {IPermission} from '@shared/interfaces/permission.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export interface IPermissionState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IPermission | null
}
