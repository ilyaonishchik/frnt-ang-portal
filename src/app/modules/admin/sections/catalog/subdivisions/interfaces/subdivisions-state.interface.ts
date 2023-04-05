import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ISubdivision} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'

export interface ISubdivisionsState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<ISubdivision>
  crud: ICrudAction | null
}
