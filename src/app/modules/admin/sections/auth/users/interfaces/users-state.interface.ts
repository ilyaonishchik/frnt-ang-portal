import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IUserFull} from '@shared/interfaces/user.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

export interface IUsersState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<IUserFull> | null
  crud: ICrudAction | null
}
