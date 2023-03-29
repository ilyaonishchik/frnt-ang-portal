import {IRole} from './role.interface'
import {IPermission} from './permission.interface'
import {IBackendErrors} from './backend-errors.interface'
import {IClient} from '@shared/interfaces/client.interface'

export interface ISessionState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  allRoles: IRole[] | null
  allPermissions: IPermission[] | null
  client: IClient | null
}
