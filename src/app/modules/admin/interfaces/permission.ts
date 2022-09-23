export interface IAdminPermission {
  id: number
  name: string | null
  comment: string | null
  status: number
}

export interface IAdminPermissions {
  records: number
  results: IAdminPermission[]
}
