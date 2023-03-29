export interface IPermission {
  id: number
  code: string
  name: string
  comment: string | null
  status: boolean
}

export interface IPermissionSave {
  code: string
  name: string
  comment: string | null
  status: boolean
}
