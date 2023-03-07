import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {ICategory} from '@modules/documents/interfaces/category.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'

export interface IDocsState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  categories: ICategory[] | null
  files: ITableItems<IFile>
}
