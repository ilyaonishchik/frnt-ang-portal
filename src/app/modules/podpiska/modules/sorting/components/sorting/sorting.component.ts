import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {Dropdown} from 'primeng/dropdown'

import {getPeriodicalsAction} from '../../store/actions/periodicals.action'
import {
  cellsSelector,
  errorsSelector,
  isLoadingSelector,
  periodicalsSelector,
} from '../../store/selectors'
import {IPeriodical} from '../../interfaces/periodical.interface'
import {ICell} from '../../interfaces/cell.interface'
import {
  clearCellsAction,
  getCellsAction,
} from '../../store/actions/cells.action'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {SerialService} from '@shared/services/serial.service'

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.scss'],
})
export class SortingComponent implements OnInit, OnDestroy {
  @ViewChild('periodicals') items!: Dropdown

  selectedDate: Date = new Date()
  currentDate: Date = new Date()
  selectedBarcode: string | null = null
  selectedPeriodical: IPeriodical | null = null
  barcodeNotFound = false
  digitsExist = false

  isLoading$!: Observable<boolean>
  periodicals$!: Observable<IPeriodical[] | null>
  cells$!: Observable<ICell[] | null>
  errors$!: Observable<IBackendErrors | null>

  constructor(private store: Store, private serialService: SerialService) {}

  ngOnInit(): void {
    const filters = [
      {usbVendorId: 1027, usbProductId: 24592},
      {usbVendorId: 1027, usbProductId: 24577},
    ]
    this.serialService.getPorts(filters, true).then((ports) => {
      this.digitsExist = ports.length > 0
      this.serialService.setCurrentPort(ports.pop())
      this.serialService.clearDigits().then()
    })
    this.initializeValues()
    this.changeInvoiceDate()
  }

  changeInvoiceDate(): void {
    this.clearCurrentItem()
    this.store.dispatch(getPeriodicalsAction({date: this.selectedDate}))
  }

  changeBarcode(): void {
    this.selectedPeriodical = this.items.options.find(
      (value) => value.barcode === this.selectedBarcode
    )
    if (this.selectedPeriodical) {
      this.changeCurrentItem()
    } else {
      this.clearCurrentItem()
      this.barcodeNotFound = true
    }
    this.selectedBarcode = null
  }

  changeCurrentItem(): void {
    this.barcodeNotFound = false
    if (this.selectedPeriodical) {
      this.store.dispatch(
        getCellsAction({
          invoice: this.selectedPeriodical.id_rec,
          digitsExist: this.digitsExist,
        })
      )
    }
  }

  private initializeValues(): void {
    this.selectedDate.setDate(this.currentDate.getDate() - 1)
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.periodicals$ = this.store.select(periodicalsSelector)
    this.cells$ = this.store.select(cellsSelector)
    this.errors$ = this.store.select(errorsSelector)
  }

  clearCurrentItem(): void {
    this.barcodeNotFound = false
    this.selectedPeriodical = null
    this.store.dispatch(clearCellsAction({digitsExist: this.digitsExist}))
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearCellsAction({digitsExist: this.digitsExist}))
  }

  checkDigits(event: any) {
    if (event.checked) {
      const lines: string[] = []
      for (let i = 1; i < 51; i++) {
        lines.push(`;${i}-888`)
      }
      lines.unshift('#')
      this.serialService.sendData(lines).then()
    } else {
      this.serialService.clearDigits().then()
    }
  }
}
