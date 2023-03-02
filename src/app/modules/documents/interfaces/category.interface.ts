export interface ICategory {
  id: number
  parent: number | null
  label: string
  // cat_desc: string
  icon?: string
  items?: ICategory[] | null
}
