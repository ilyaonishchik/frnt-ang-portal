import {IUser} from '@shared/interfaces/user.interface'

export interface ISigninResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: IUser
}
