import {TCrudAction} from '../types/crud-action.type'

export interface ICrudAction {
  id: number | null
  action: TCrudAction
  confirm?: string | number
}
