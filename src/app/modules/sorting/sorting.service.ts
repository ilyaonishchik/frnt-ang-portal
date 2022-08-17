import {Injectable} from '@angular/core'
import {Observable, Subject} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {ItemInterface} from './types/item.interface'
import {CellInterface} from './types/cell.interface'

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  public invoice$ = new Subject<number>()

  constructor(private http: HttpClient) {}

  public changeInvoice(invoice: number): void {
    this.invoice$.next(invoice)
  }

  getBarcodeInfo(
    region: number,
    invoiceDate: string,
    barcode: string
  ): Observable<ItemInterface[]> {
    const httpOptions = {
      headers: {'Content-Type': 'application/json'},
      params: {region: region, data: invoiceDate, barcode: barcode},
    }

    return this.http.get<ItemInterface[]>('/api/v1/sorting/prihod', httpOptions)
  }

  getCells(invoiceId: number): Observable<CellInterface[]> {
    const httpOptions = {
      headers: {'Content-Type': 'application/json'},
      params: {invoice: invoiceId},
    }

    return this.http.get<CellInterface[]>('/api/v1/sorting/rashod', httpOptions)
  }
}
