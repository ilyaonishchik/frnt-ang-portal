export enum AuthActionTypes {
  REDIRECT = '[Auth] Set redirect url',

  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup success',
  SIGNUP_FAILURE = '[Auth] Signup failure',

  SIGNIN = '[Auth] Signin',
  SIGNIN_SUCCESS = '[Auth] Signin success',
  SIGNIN_FAILURE = '[Auth] Signin failure',

  SIGNOUT = '[Auth] Signout',
  SIGNOUT_SUCCESS = '[Auth] Signout success',
  SIGNOUT_FAILURE = '[Auth] Signout failure',

  GET_CURRENT_USER = '[Auth] Get current user',
  GET_CURRENT_USER_SUCCESS = '[Auth] Get current user success',
  GET_CURRENT_USER_FAILURE = '[Auth] Get current user failure',
}
