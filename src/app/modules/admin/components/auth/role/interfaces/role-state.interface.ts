import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IRoleFull} from '@shared/interfaces/role.interface'

export interface IRoleState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IRoleFull | null
}
