import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {IBackendError} from 'src/app/shared/interfaces/backend-errors.interface'

export interface IPermissionState {
  isLoading: boolean
  isReadOnly: boolean
  isSubmitting: boolean
  validationError: IBackendError | null
  item: IPermission | null
}
