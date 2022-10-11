export enum ActionTypes {
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

  GET_ALL_ROLES = '[Auth] Get all roles',
  GET_ALL_ROLES_SUCCESS = '[Auth] Get all roles success',
  GET_ALL_ROLES_FAILURE = '[Auth] Get all roles failure',

  GET_ALL_PERMISSIONS = '[Auth] Get all permissions',
  GET_ALL_PERMISSIONS_SUCCESS = '[Auth] Get all permissions success',
  GET_ALL_PERMISSIONS_FAILURE = '[Auth] Get all permissions failure',
}
