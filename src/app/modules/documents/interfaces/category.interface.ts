export interface ICategory {
  id: number
  parent: number | null
  cat_name: string
  cat_desc: string | null
  icon?: string
  items?: ICategory[] | null
}
