export interface ILink {
  id: number
  name: string
  website: string
  comment: string | null
  sort: number
  status: boolean
}

export interface ILinkSave {
  name: string
  website: string
  comment: string | null
  sort: number
  status: boolean
}
