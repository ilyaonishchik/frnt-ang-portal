import {IRoles} from './roles.interface'

export interface IRolesState {
  isLoading: boolean
  error: string | null
  data: IRoles | null
}
