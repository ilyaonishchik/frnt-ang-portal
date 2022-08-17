import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {faBarcode} from '@fortawesome/free-solid-svg-icons'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SortingService} from '../../sorting.service'
import {ItemInterface} from '../../types/item.interface'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  region: number = 4
  invoiceDate: string
  searchCode: string = ''

  searchForm!: FormGroup
  items: ItemInterface[] = []
  searching: boolean = false

  constructor(
    private sortingService: SortingService,
    private fb: FormBuilder,
    libraryIcons: FaIconLibrary
  ) {
    libraryIcons.addIcons(faBarcode)
    this.invoiceDate = SearchComponent.yesterday()
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      pressCode: ['', [Validators.minLength(13)]],
    })
  }

  private static yesterday(): string {
    let _date = new Date()
    _date.setDate(_date.getDate() - 1)
    return _date.toLocaleDateString()
  }

  private changeCode(code: string): void {
    this.searchCode = code
    this.sortingService
      .getBarcodeInfo(this.region, this.invoiceDate, this.searchCode)
      .subscribe({
        next: (res) => this.updateItems(res),
        error: (err) => console.error(err),
      })
  }

  private updateItems(items: ItemInterface[]) {
    let invoiceId: number = 0
    this.searching = true
    this.items = items
    if (this.items.length) {
      invoiceId = this.items[0].id_rec
    }
    this.sortingService.changeInvoice(invoiceId)
  }

  onChangeInvoiceDate(date: string) {
    this.invoiceDate = date
  }

  onChangePressCode(event: any): void {
    this.changeCode(event.target.value)
    this.searchForm.setValue({pressCode: null})
  }
}
