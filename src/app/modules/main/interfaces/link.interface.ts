export interface ILink {
  name: string
  website: string
  comment: string | null
  // sort: number
  // status: boolean
}

export interface ILinks {
  links: ILink[]
}
