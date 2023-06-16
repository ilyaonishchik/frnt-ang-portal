import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IPermissionFull} from '@shared/interfaces/permission.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export interface IPermissionsState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<IPermissionFull>
  crud: ICrudAction | null
}
