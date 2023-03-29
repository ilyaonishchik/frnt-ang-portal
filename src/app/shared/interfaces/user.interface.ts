import {IRole} from './role.interface'
import {IPermission} from './permission.interface'

export interface IUser {
  id: number
  username: string
  email: string | null
  password: string | null
  comment: string | null
  avatar: string | null
  sd_id: number | null
  roles: IRole[]
  permissions: IPermission[]
  verify: string | null
  last_login: string | null
  status: boolean
}

// export interface IUserCreate {
//   id: number
//   username: string
//   password: string
//   email: string | null
//   comment: string | null
//   avatar: string | null
//   sd_id: number | null
//   roles: IRole[]
//   permissions: IPermission[]
//   status: number
// }

export interface IUserSave {
  username: string
  password: string | null
  email: string | null
  comment: string | null
  avatar: string | null
  sd_id: number | null
  roles: number[]
  permissions: number[]
  status: boolean
}

// interface ICurrentUser {
//   id: number
//   username: string
//   email: string | null
//   comment: string | null
//   avatar: string | null
//   sd_id: number | null
//   roles: IRole[]
//   permissions: IPermission[]
//   verify: string | null
//   last_login: string | null
//   status: number
// }

export interface IUserReset {
  email: string
}
