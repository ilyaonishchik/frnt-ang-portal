import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ILink} from './link.interface'

export interface ILinksState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<ILink> | null
  crud: ICrudAction | null
}
