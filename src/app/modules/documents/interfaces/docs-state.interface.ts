import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IFile} from '@modules/documents/interfaces/file.interface'
import {ICategory} from '@modules/documents/interfaces/category.interface'

export interface IDocsState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  categories: ICategory[] | null
  files: IFile[] | null
}
