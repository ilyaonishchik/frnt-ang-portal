import {IAuthState} from '../types/auth-state.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  signupAction,
  signupFailureAction,
  signupSuccessAction,
} from './actions/signup.action'
import {
  signinAction,
  signinFailureAction,
  signinSuccessAction,
} from './actions/signin.action'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/get-current-user.action'

import {
  signoutAction,
  signoutFailureAction,
  signoutSuccessAction,
} from './actions/signout.action'

const initialState: IAuthState = {
  isSubmitting: false,
  isLoading: false,
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
  ),
  on(
    signinAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      validationError: null,
    })
  ),
  on(
    signinSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isSignedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    signinFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationError: action.error,
    })
  ),
  on(
    signoutAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    signoutSuccessAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: false,
      isSignedIn: false,
      currentUser: null,
    })
  ),
  on(
    signoutFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      validationError: action.error,
    })
  ),
  on(
    getCurrentUserAction,
    (state): IAuthState => ({...state, isLoading: true})
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isLoading: false,
      isSignedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): IAuthState => ({
      ...state,
      isLoading: false,
      isSignedIn: false,
      currentUser: null,
    })
  )
)

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action)
}
