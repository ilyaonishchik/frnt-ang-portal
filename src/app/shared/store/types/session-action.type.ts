export enum SessionActionTypes {
  GET_ALL_USERS = '[Session] Get all users',
  GET_ALL_USERS_SUCCESS = '[Session] Get all users success',
  GET_ALL_USERS_FAILURE = '[Session] Get all users failure',
  CLEAR_USERS = '[Session] Clear users list',

  GET_ALL_ROLES = '[Session] Get all roles',
  GET_ALL_ROLES_SUCCESS = '[Session] Get all roles success',
  GET_ALL_ROLES_FAILURE = '[Session] Get all roles failure',
  CLEAR_ROLES = '[Session] Clear roles list',

  GET_ALL_PERMISSIONS = '[Session] Get all permissions',
  GET_ALL_PERMISSIONS_SUCCESS = '[Session] Get all permissions success',
  GET_ALL_PERMISSIONS_FAILURE = '[Session] Get all permissions failure',
  CLEAR_PERMISSIONS = '[Session] Clear permissions list',

  GET_CLIENT_INFO = '[Session] Get client info',
  GET_CLIENT_INFO_SUCCESS = '[Session] Get client info success',
  GET_CLIENT_INFO_FAILURE = '[Session] Get client info failure',
}
