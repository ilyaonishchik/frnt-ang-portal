import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IRole, IRoleSave} from 'src/app/shared/interfaces/role.interface'

export interface IRoleState {
  isLoading: boolean
  isSubmitting: boolean
  validationErrors: IBackendErrors | null
  item: IRole | null
  itemSave: IRoleSave | null
}
