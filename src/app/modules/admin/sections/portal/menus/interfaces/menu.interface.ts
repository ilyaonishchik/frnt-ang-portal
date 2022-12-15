export interface IMenu {
  id: number
  parent: number
  type: number
  label: string
  icon: string | null
  link: string | null
  permission: string | null
  separator: boolean | null
  comment: string | null
  sort: number
  status: boolean
}

export interface IMenuSave {
  parent: number
  type: number
  label: string
  icon: string | null
  link: string | null
  permission: string | null
  separator: boolean | null
  comment: string | null
  sort: number
  status: boolean
}
