import {Component, OnDestroy, OnInit} from '@angular/core'

import {SortingService} from '../../services/sorting.service'
import {IIncoming, IOutgoing} from './interfaces/invoices.interface'
import {SerialService} from '../../../../shared/services/serial.service'

@Component({
  selector: 'app-sortirovka',
  templateUrl: './sortirovka.component.html',
  styleUrls: ['./sortirovka.component.scss'],
})
export class SortirovkaComponent implements OnInit, OnDestroy {
  items: IIncoming[] = []
  cells: IOutgoing[] = []
  selectedItem: IIncoming | null = null
  selectedDate: Date
  selectedBarcode: string | null = null
  barcodeNotFound: boolean = false
  digitsExist: boolean = false
  digitsRequest: boolean = true
  region: number = 4

  constructor(
    private sortingService: SortingService,
    private serialService: SerialService
  ) {
    this.selectedDate = new Date()
  }

  ngOnInit(): void {
    const filters = [
      {usbVendorId: 1027, usbProductId: 24592},
      {usbVendorId: 1027, usbProductId: 24577},
    ]
    this.serialService.getPorts(filters, this.digitsRequest).then((ports) => {
      this.digitsExist = ports.length > 0
      this.serialService.setCurrentPort(ports.pop())
    })
    this.selectedDate.setDate(this.selectedDate.getDate() - 1)
    this.changeInvoiceDate()
  }

  changeCurrentItem(): void {
    this.barcodeNotFound = false
    console.log('changeCurrentItem')
    if (this.selectedItem?.id_rec) {
      this.sortingService
        .getOutgoingInvoices(this.selectedItem.id_rec)
        .subscribe({
          next: (value) => {
            this.updateCells(value)
          },
        })
    } else {
      this.updateCells([])
    }
  }

  clearCurrentItem(): void {
    console.log('clearCurrentItem')
    this.selectedItem = null
    this.selectedBarcode = null
    this.updateCells([])
  }

  changeBarcode(): void {
    console.log('changeBarcode')
    this.selectedItem = null
    let filteredItems: IIncoming[] = this.items.filter(
      (item) => item.barcode === this.selectedBarcode
    )
    if (filteredItems.length > 0) {
      this.barcodeNotFound = false
      this.selectedItem = filteredItems[0]
      this.changeCurrentItem()
    } else {
      this.barcodeNotFound = true
      this.clearCurrentItem()
    }
    this.selectedBarcode = null
  }

  changeInvoiceDate(): void {
    console.log('changeInvoiceDate')
    this.barcodeNotFound = false
    this.updateCells([])
    if (this.selectedDate) {
      this.sortingService
        .getIncomingInvoices(
          this.region,
          this.selectedDate.toLocaleDateString()
        )
        .subscribe({
          next: (value) => {
            this.items = value
          },
        })
    } else {
      this.items = []
    }
  }

  updateCells(cells: IOutgoing[]): void {
    console.log('updateCells')
    this.cells = cells
    if (cells) {
      let lines: string[] = []
      for (const cellKey in cells) {
        if (cells[cellKey].cell) {
          lines.push(`;${cells[cellKey].cell}-${cells[cellKey].nom_count}`)
        }
      }
      this.sendDataToPort(lines)
    } else {
      this.clearDigits()
    }
  }

  sendDataToPort(text: string[]): void {
    if (this.digitsExist) {
      text.unshift('#')
      this.serialService.sendData(text)
    }
  }

  clearDigits(): void {
    if (this.digitsExist) {
      this.serialService.clearDigits()
    }
  }

  testAction(text: string): void {
    console.log(text)
  }

  ngOnDestroy(): void {
    this.clearDigits()
  }
}
