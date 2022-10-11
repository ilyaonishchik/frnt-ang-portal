import {IAuthState} from '../interfaces/auth-state.interface'
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
import {redirectAction} from './actions/redirect.action'
import {
  getAllRolesAction,
  getAllRolesFailureAction,
  getAllRolesSuccessAction,
} from './actions/get-all-roles.action'
import {
  getAllPermissionsAction,
  getAllPermissionsFailureAction,
  getAllPermissionsSuccessAction,
} from './actions/get-all-permissions.action'

const initialState: IAuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  allRoles: [],
  allPermissions: [],
  isSignedIn: null,
  validationError: null,
  redirectUrl: '/',
}

const authReducer = createReducer(
  initialState,
  on(
    redirectAction,
    (state, action): IAuthState => ({
      ...state,
      redirectUrl: action.url,
    })
  ),
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
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      isSignedIn: false,
      currentUser: null,
      allRoles: [],
      allPermissions: [],
      redirectUrl: action.url,
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
  ),
  on(getAllRolesAction, (state): IAuthState => ({...state, isLoading: true})),
  on(
    getAllRolesSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isLoading: false,
      allRoles: action.roles,
    })
  ),
  on(
    getAllRolesFailureAction,
    (state): IAuthState => ({
      ...state,
      isLoading: false,
      allRoles: [],
    })
  ),
  on(
    getAllPermissionsAction,
    (state): IAuthState => ({...state, isLoading: true})
  ),
  on(
    getAllPermissionsSuccessAction,
    (state, action): IAuthState => ({
      ...state,
      isLoading: false,
      allPermissions: action.permissions,
    })
  ),
  on(
    getAllPermissionsFailureAction,
    (state): IAuthState => ({
      ...state,
      isLoading: false,
      allPermissions: [],
    })
  )
)

export function reducer(state: IAuthState, action: Action) {
  return authReducer(state, action)
}
