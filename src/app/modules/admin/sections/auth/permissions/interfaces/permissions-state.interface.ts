import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {ICrudAction} from 'src/app/shared/interfaces/crud-action.interface'

export interface IPermissionsState {
  isLoading: boolean
  error: string | null
  data: ITableItems<IPermission>
  crud: ICrudAction | null
}
