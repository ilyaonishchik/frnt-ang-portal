import {ITableItems} from '../../../../../../shared/interfaces/table-items.interface'
import {IRole} from '../../../../../../shared/interfaces/role.interface'

export interface IRolesState {
  isLoading: boolean
  error: string | null
  data: ITableItems<IRole> | null
}
