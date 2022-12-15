import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ILink} from './link.interface'

export interface IMainState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  links: ILink[] | null
}
