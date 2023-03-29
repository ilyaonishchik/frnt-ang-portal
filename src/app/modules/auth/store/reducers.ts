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
  signoutAction,
  signoutFailureAction,
  signoutSuccessAction,
} from './actions/signout.action'
import {redirectAction} from './actions/redirect.action'
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/get-current-user.action'

export const authFeatureKey = 'auth'

const initialState: IAuthState = {
  isSubmitting: false,
  isLoading: false,
  isSignedIn: false,
  currentUser: null,
  backendErrors: null,
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
      backendErrors: null,
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
      backendErrors: action.errors,
    })
  ),
  on(
    signinAction,
    (state): IAuthState => ({
      ...state,
      isSubmitting: true,
      currentUser: null,
      backendErrors: null,
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
      backendErrors: action.errors,
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
      redirectUrl: action.url,
    })
  ),
  on(
    signoutFailureAction,
    (state, action): IAuthState => ({
      ...state,
      isSubmitting: false,
      backendErrors: action.errors,
    })
  ),
  on(
    getCurrentUserAction,
    (state): IAuthState => ({
      ...state,
      isLoading: true,
      isSignedIn: false,
    })
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
    (state, action): IAuthState => ({
      ...state,
      isLoading: false,
      isSignedIn: false,
      currentUser: null,
      backendErrors: action.errors,
    })
  )
  // on(getAllRolesAction, (state): IAuthState => ({...state, isLoading: true})),
  // on(
  //   getAllRolesSuccessAction,
  //   (state, action): IAuthState => ({
  //     ...state,
  //     isLoading: false,
  //     allRoles: action.roles,
  //   })
  // ),
  // on(
  //   getAllRolesFailureAction,
  //   (state): IAuthState => ({
  //     ...state,
  //     isLoading: false,
  //     allRoles: [],
  //   })
  // ),
  // on(
  //   getAllPermissionsAction,
  //   (state): IAuthState => ({...state, isLoading: true})
  // ),
  // on(
  //   getAllPermissionsSuccessAction,
  //   (state, action): IAuthState => ({
  //     ...state,
  //     isLoading: false,
  //     allPermissions: action.permissions,
  //   })
  // ),
  // on(
  //   getAllPermissionsFailureAction,
  //   (state): IAuthState => ({
  //     ...state,
  //     isLoading: false,
  //     allPermissions: [],
  //   })
  // )
)

export function reducerAuth(state: IAuthState, action: Action) {
  return authReducer(state, action)
}
