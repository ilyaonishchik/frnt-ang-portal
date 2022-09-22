import {IAuthState} from '../types/auth-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  signupAction,
  signupFailureAction,
  signupSuccessAction,
} from './actions/signup.action'

const initialState: IAuthState = {
  isSubmitting: false,
  currentUser: null,
  isSignedIn: null,
  validationError: null,
}

const authReducer = createReducer(
  initialState,
  on(
    signupAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validationError: null,
    })
  ),
  on(
    signupSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isSignedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    signupFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationError: action.error,
    })
  )
)

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action)
}
