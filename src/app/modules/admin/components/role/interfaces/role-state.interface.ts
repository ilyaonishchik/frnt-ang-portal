import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'

export interface IRoleState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IRole | null
}
