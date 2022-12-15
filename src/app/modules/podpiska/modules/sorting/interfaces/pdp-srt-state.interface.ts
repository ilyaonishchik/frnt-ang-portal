import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ICell} from './cell.interface'
import {IPeriodical} from './periodical.interface'

export interface IPdpSrtState {
  isLoading: boolean
  backendErrors: IBackendErrors | null
  invoiceDate: Date | null
  periodicalList: IPeriodical[] | null
  cells: ICell[] | null
}
