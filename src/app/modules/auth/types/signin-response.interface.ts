import {ICurrentUser} from '../../../shared/types/current-user.interface'

export interface ISigninResponse {
  tokens: {
    access_token: string
    refresh_token: string
    token_type: string
  }
  user: ICurrentUser
}
