export interface IPermission {
  id: number
  name: string | null
  comment: string | null
  status: number
}

export interface IPermissions {
  records: number
  results: IPermission[]
}
