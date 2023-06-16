import {IPermissionFull} from '@shared/interfaces/permission.interface'
import {IRole} from '@shared/interfaces/role.interface'

export interface ISignupResponse {
  id: number
  username: string
  email: string | null
  password: string | null
  comment: string | null
  avatar: string | null
  sd_id: number | null
  roles: IRole[]
  permissions: IPermissionFull[]
  verify: string | null
  last_login: string | null
  status: boolean
}
