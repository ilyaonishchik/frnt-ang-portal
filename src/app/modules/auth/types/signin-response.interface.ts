import {ICurrentUser} from '../../../shared/types/current-user.interface'

export interface ISigninResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: ICurrentUser
}
