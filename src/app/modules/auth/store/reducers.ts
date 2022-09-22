import {IAuthState} from '../types/auth-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {signupAction} from './actions/signup.action'

const initialState: IAuthState = {
  isSubmitting: false,
}

const authReducer = createReducer(
  initialState,
  on(signupAction, (state): IAuthState => ({...state, isSubmitting: true}))
)

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action)
}
