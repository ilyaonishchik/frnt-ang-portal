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
  region: number = 4

  constructor(
    private sortingService: SortingService,
    private serialService: SerialService
  ) {
    this.selectedDate = new Date()
  }

  ngOnInit(): void {
    // const filters = [{usbVendorId: 1027, usbProductId: 24592}]
    this.serialService.getPorts().then((r) => {
      this.serialService.setCurrentPort(r.pop())
    })
    this.selectedDate.setDate(this.selectedDate.getDate() - 1)
    this.changeInvoiceDate()
  }

  changeCurrentItem() {
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

  clearCurrentItem() {
    this.selectedItem = null
    this.selectedBarcode = null
    this.cells = []
  }

  changeBarcode() {
    this.selectedItem = null
    let filteredItems: IIncoming[] = this.items.filter(
      (item) => item.barcode === this.selectedBarcode
    )
    if (filteredItems.length > 0) {
      this.selectedItem = filteredItems[0]
      this.changeCurrentItem()
    }
    this.selectedBarcode = null
  }

  changeInvoiceDate() {
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
    this.cells = cells
    let lines: string[] = []
    for (const cellKey in cells) {
      if (cells[cellKey].cell) {
        lines.push(`;${cells[cellKey].cell}-${cells[cellKey].nom_count}`)
      }
    }
    this.sendDataToPort(lines)
  }

  sendDataToPort(text: string[]): void {
    text.unshift('#')
    this.serialService.sendData(text)
  }

  clearDigits() {
    this.serialService.clearDigits()
  }

  ngOnDestroy() {
    this.clearDigits()
  }
}
