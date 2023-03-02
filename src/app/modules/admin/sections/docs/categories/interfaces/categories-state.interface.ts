import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'

export interface ICategoriesState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<ICategory>
  crud: ICrudAction | null
}
