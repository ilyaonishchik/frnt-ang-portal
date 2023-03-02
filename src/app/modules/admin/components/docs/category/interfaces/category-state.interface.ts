import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'

export interface ICategoryState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: ICategory | null
}
