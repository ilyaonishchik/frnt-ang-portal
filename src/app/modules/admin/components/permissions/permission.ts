export interface IPermission {
  id: number
  name: string
  comment?: string
  status: number
}

export interface IPermissions {
  records: number
  results: IPermission[]
}
