import {Component, OnInit} from '@angular/core'

import {SortingService} from '../../services/sorting.service'
import {IIncoming} from './interfaces/invoices.interface'

@Component({
  selector: 'app-sortirovka',
  templateUrl: './sortirovka.component.html',
  styleUrls: ['./sortirovka.component.scss'],
})
export class SortirovkaComponent implements OnInit {
  items!: IIncoming[]
  selectedItem: IIncoming | null = null
  selectedDate!: Date

  constructor(private sortingService: SortingService) {
    this.selectedDate = new Date()
  }

  ngOnInit(): void {
    this.selectedDate.setDate(this.selectedDate.getDate() - 3)
    this.sortingService
      .getIncomingInvoices(4, this.selectedDate.toLocaleDateString())
      .subscribe({
        next: (value) => {
          console.log(value)

          this.items = value
        },
      })
  }

  selecting() {
    console.log(this.selectedItem)
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
