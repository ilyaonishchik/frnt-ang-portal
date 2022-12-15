import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IRole} from '@shared/interfaces/role.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export interface IRolesState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<IRole> | null
  crud: ICrudAction | null
}
