export interface IRole {
  id?: number
  name?: string
  comment?: string
  status?: number
}

export interface IRoles {
  results: IRole[]
  records: number
}
