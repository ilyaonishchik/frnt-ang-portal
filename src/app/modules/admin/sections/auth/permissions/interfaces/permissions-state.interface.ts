import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

export interface IPermissionsState {
  isLoading: boolean
  error: string | null
  data: ITableItems<IPermission>
}
