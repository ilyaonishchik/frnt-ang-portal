export enum ActionTypes {
  GET_PERMISSIONS = '[Permissions] Get permissions',
  GET_PERMISSIONS_SUCCESS = '[Permissions] Get permissions success',
  GET_PERMISSIONS_FAILURE = '[Permissions] Get permissions failure',

  PERMISSION_READ = '[Permissions] Read permission',
  PERMISSION_CREATE = '[Permissions] Create permission',
  PERMISSION_UPDATE = '[Permissions] Update permission',
  PERMISSION_DELETE = '[Permissions] Delete permission',
  PERMISSION_DELETE_CONFIRM = '[Permissions] Delete permission confirm',
  PERMISSION_DELETE_CANCEL = '[Permissions] Delete permission cancel',
  PERMISSION_SAVE = '[Permissions] Save permission',
  PERMISSION_DIALOG_HIDE = '[Permissions] Hide permission dialog',
}
