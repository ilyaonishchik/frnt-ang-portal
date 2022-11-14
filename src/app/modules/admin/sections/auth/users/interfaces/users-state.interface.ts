import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {ICrudAction} from 'src/app/shared/interfaces/crud-action.interface'
import {IUser} from 'src/app/shared/interfaces/user.interface'

export interface IUsersState {
  isLoading: boolean
  error: string | null
  data: ITableItems<IUser> | null
  crud: ICrudAction | null
}
