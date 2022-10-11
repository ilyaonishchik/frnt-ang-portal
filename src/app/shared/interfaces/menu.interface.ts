export interface IMenu {
  label: string
  icon?: string
  routerLink?: string[]
  separator?: boolean
  items?: IMenu[]
}

export interface IMenus {
  items: IMenu[]
}
