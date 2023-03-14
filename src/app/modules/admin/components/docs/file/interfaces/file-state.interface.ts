import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'

export interface IFileState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IFile | null
}
