import {Injectable} from '@angular/core'
import {HttpParams, HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {IPeriodical} from '../interfaces/periodical.interface'
import {ICell} from '../interfaces/cell.interface'

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  constructor(private http: HttpClient) {}

  getPeriodicals(region: number, invoiceDate: Date): Observable<IPeriodical[]> {
    const params = new HttpParams({
      fromObject: {region: region, data: invoiceDate.toLocaleDateString()},
    })
    return this.http.get<IPeriodical[]>(`${environment.urlApiPdp}/prihod`, {
      params: params,
    })
  }

  getCells(invoice: number): Observable<ICell[]> {
    const params = new HttpParams({
      fromObject: {invoice: invoice},
    })
    return this.http.get<ICell[]>(`${environment.urlApiPdp}/rashod`, {
      params: params,
    })
  }
}
