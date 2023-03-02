export interface ICategory {
  id: number
  parent: number | null
  cat_name: string
  cat_desc: string | null
  sort: number
  status: boolean
}

export interface ICategorySave {
  parent: number | null
  cat_name: string
  cat_desc: string | null
  sort: number
  status: boolean
}
