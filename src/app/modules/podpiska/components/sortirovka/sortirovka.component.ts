import {Component, OnInit} from '@angular/core'

import {SortingService} from '../../services/sorting.service'
import {IIncoming, IOutgoing} from './interfaces/invoices.interface'
import {AvsSerial} from '../../../../shared/classes/avs-serial'

@Component({
  selector: 'app-sortirovka',
  templateUrl: './sortirovka.component.html',
  styleUrls: ['./sortirovka.component.scss'],
})
export class SortirovkaComponent implements OnInit {
  serialPort!: AvsSerial
  currentPort: any
  options = {
    baudRate: 19200,
    dataBits: 8,
    parity: 'none',
    bufferSize: 256,
    flowControl: 'none',
  }

  items!: IIncoming[]
  cells!: IOutgoing[]
  selectedItem: IIncoming | null = null
  selectedDate!: Date
  selectedBarcode: string | null = null

  constructor(private sortingService: SortingService) {
    this.serialPort = new AvsSerial(this.dataPortHandler, this.options)
    this.selectedDate = new Date()
  }

  ngOnInit(): void {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1)
    this.changeInvoiceDate()
  }

  changeCurrentItem() {
    if (this.selectedItem?.id_rec) {
      this.sortingService
        .getOutgoingInvoices(this.selectedItem.id_rec)
        .subscribe({
          next: (value) => {
            this.cells = value
          },
        })
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
        .getIncomingInvoices(4, this.selectedDate.toLocaleDateString())
        .subscribe({
          next: (value) => {
            this.items = value
          },
        })
    } else {
      this.items = []
    }
  }

  dataPortHandler(data: string): void {
    console.log(`Read from serial port: ${data}`)
  }

  sendDataToPort(): void {
    if (!this.currentPort) {
      this.serialPort.connect((port: any) => {
        this.currentPort = port
      })
    } else {
      console.log(this.currentPort)
      this.serialPort.sendData('#\r').then((_) => {})
      this.serialPort.sendData(';1-55\r').then((_) => {})
      this.serialPort.close((port: any) => {
        this.currentPort = port
      })
    }
  }
}
