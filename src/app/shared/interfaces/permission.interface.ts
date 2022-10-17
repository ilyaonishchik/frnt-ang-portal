export interface IPermission {
  id: number
  code: string
  name: string
  comment: string | null
  status: number
}

export interface IPermissionSave {
  code: string
  name: string
  comment: string | null
  status: number
}
