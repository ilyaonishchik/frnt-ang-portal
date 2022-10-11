import {ICurrentUser} from '../../../shared/interfaces/current-user.interface'

export interface ISigninResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: ICurrentUser
}
