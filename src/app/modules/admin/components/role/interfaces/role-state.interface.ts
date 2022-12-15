import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IRole} from '@shared/interfaces/role.interface'

export interface IRoleState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IRole | null
}
