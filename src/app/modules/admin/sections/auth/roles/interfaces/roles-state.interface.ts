import {IRole} from 'src/app/shared/interfaces/role.interface'

export interface IRolesState {
  isLoading: boolean
  error: string | null
  items: IRole[]
  count: number
}
