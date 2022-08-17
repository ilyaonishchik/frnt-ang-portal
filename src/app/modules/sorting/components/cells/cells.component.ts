import {Component, OnDestroy, OnInit} from '@angular/core'

import {Subscription} from 'rxjs'

import {CellInterface} from '../../types/cell.interface'
import {SortingService} from '../../sorting.service'
import {SerialService} from '../../../../services/serial.service'

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.scss'],
})
export class CellsComponent implements OnInit, OnDestroy {
  private subs!: Subscription
  cells: CellInterface[] = []

  constructor(
    private sortingService: SortingService,
    private serialService: SerialService
  ) {}

  ngOnInit(): void {
    this.subs = this.sortingService.invoice$.subscribe((invoice) =>
      this.changeInvoice(invoice)
    )
  }

  changeInvoice(invoice: number): void {
    if (invoice > 0) {
      this.sortingService.getCells(invoice).subscribe({
        next: (res) => {
          this.updateCells(res)
        },
      })
    } else {
      this.updateCells([])
    }
  }

  updateCells(cells: CellInterface[]): void {
    this.cells = cells
    let lines: string[] = ['#']
    for (const cellKey in cells) {
      if (cells[cellKey].cell) {
        lines.push(`;${cells[cellKey].cell}-${cells[cellKey].nom_count}`)
      }
    }
    this.serialService.sendData(lines).then(() => {})
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
