import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'

export interface IFilesState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  data: ITableItems<IFile>
  crud: ICrudAction | null
}
