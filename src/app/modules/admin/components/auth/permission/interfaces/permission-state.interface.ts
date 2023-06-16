import {IPermissionFull} from '@shared/interfaces/permission.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export interface IPermissionState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IPermissionFull | null
}
