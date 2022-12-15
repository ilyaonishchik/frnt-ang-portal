import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IMenu} from './menu.interface'

export interface IMenusState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<IMenu> | null
  crud: ICrudAction | null
}
