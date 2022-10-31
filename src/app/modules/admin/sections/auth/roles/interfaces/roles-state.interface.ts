import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'
import {ICrudAction} from 'src/app/shared/interfaces/crud-action.interface'

export interface IRolesState {
  isLoading: boolean
  error: string | null
  data: ITableItems<IRole> | null
  crud: ICrudAction | null
}
