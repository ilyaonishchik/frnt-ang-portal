export enum ActionTypes {
  GET_PERMISSIONS = '[Permissions] Get permissions',
  GET_PERMISSIONS_SUCCESS = '[Permissions] Get permissions success',
  GET_PERMISSIONS_FAILURE = '[Permissions] Get permissions failure',

  GET_PERMISSION = '[Permission] Get permission',
  GET_PERMISSION_SUCCESS = '[Permission] Get permission success',
  GET_PERMISSION_FAILURE = '[Permission] Get permission failure',

  DELETE_PERMISSION = '[Permission] Delete permission',
  DELETE_PERMISSION_SUCCESS = '[Permission] Delete permission success',
  DELETE_PERMISSION_FAILURE = '[Permission] Delete permission failure',

  SAVE_PERMISSION = '[Permission] Save permission',
  SAVE_PERMISSION_SUCCESS = '[Permission] Save permission success',
  SAVE_PERMISSION_FAILURE = '[Permission] Save permission failure',

  PERMISSION_READ = '[Permission] Read permission',
  PERMISSION_CREATE = '[Permission] Create permission',
  PERMISSION_UPDATE = '[Permission] Update permission',
  PERMISSION_DELETE = '[Permission] Delete permission',
  PERMISSION_DELETE_CONFIRM = '[Permission] Delete permission confirm',
  PERMISSION_DELETE_CANCEL = '[Permission] Delete permission cancel',
  PERMISSION_SAVE = '[Permission] Save permission',
  PERMISSION_DIALOG_HIDE = '[Permission] Hide permission dialog',
}
