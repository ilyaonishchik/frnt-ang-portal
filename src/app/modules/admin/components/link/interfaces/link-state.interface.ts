import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ILink} from '../../../sections/portal/links/interfaces/link.interface'

export interface ILinkState {
  isLoading: boolean
  isSubmitting: boolean
  backendErrors: IBackendErrors | null
  item: ILink | null
}
