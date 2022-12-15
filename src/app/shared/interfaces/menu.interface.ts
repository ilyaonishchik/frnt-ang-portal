export interface IMenu {
  label: string
  icon?: string
  routerLink?: string[]
  url?: string[]
  target?: string
  separator?: boolean
  badge?: string
  items?: IMenu[]
}

export interface IMenus {
  items: IMenu[]
}
