import {IPermission} from '../../../shared/interfaces/permission.interface'
import {IRole} from '../../../shared/interfaces/role.interface'

export interface ISignupResponse {
  id: number
  username: string
  email: string
  comment: string | null
  avatar: string | null
  verify: string | null
  last_login: string | null
  status: number
  roles: IRole[]
  permissions: IPermission[]
}