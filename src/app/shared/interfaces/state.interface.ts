import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'

export interface IState<T> {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<T>
  crud: ICrudAction | null
}
