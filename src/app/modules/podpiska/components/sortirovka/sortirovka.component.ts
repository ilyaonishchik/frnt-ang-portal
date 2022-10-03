import {Component, OnInit} from '@angular/core'

import {SortingService} from '../../services/sorting.service'
import {IIncoming, IOutgoing} from './interfaces/invoices.interface'

@Component({
  selector: 'app-sortirovka',
  templateUrl: './sortirovka.component.html',
  styleUrls: ['./sortirovka.component.scss'],
})
export class SortirovkaComponent implements OnInit {
  items!: IIncoming[]
  cells!: IOutgoing[]
  selectedItem: IIncoming | null = null
  selectedDate!: Date
  selectedBarcode: string | null = null

  constructor(private sortingService: SortingService) {
    this.selectedDate = new Date()
  }

  ngOnInit(): void {
    this.selectedDate.setDate(this.selectedDate.getDate() - 3)
    this.selectDate()
  }

  selecting() {
    // console.log(this.selectedItem)
    if (this.selectedItem?.id_rec) {
      console.log(this.selectedItem.barcode)
      this.sortingService
        .getOutgoingInvoices(this.selectedItem.id_rec)
        .subscribe({
          next: (value) => {
            this.cells = value
          },
        })
    }
  }

  selectBarcode() {
    this.selectedItem = null
    let filteredItems: IIncoming[] = this.items.filter(
      (item) => item.barcode === this.selectedBarcode
    )
    if (filteredItems.length > 0) {
      this.selectedItem = filteredItems[0]
      this.selecting()
    }
    this.selectedBarcode = null
  }

  selectDate() {
    // console.log(this.selectedDate.toLocaleDateString())
    this.sortingService
      .getIncomingInvoices(4, this.selectedDate.toLocaleDateString())
      .subscribe({
        next: (value) => {
          this.items = value
        },
      })
  }
}
