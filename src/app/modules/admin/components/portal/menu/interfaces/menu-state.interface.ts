import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IMenu} from '@modules/admin/sections/portal/menus/interfaces/menu.interface'

export interface IMenuState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: IMenu | null
}
