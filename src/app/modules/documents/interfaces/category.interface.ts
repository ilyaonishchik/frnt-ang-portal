export interface ICategory {
  id: number
  name: string
  icon?: string
  children?: ICategory[]
}
