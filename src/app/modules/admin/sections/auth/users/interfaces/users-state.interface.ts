import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IUser} from 'src/app/shared/interfaces/user.interface'

export interface IUsersState {
  isLoading: boolean
  error: string | null
  data: ITableItems<IUser>
}
