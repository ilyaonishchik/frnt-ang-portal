import {IPermission} from './permission.interface'
import {IRole} from './role.interface'

export interface ICurrentUser {
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
