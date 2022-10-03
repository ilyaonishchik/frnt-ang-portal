import {Injectable} from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs'
import {
  IIncoming,
  IOutgoing,
} from '../components/sortirovka/interfaces/invoices.interface'
import {AppService} from '../../../shared/services/app.service'

@Injectable({
  providedIn: 'root',
})
export class SortingService {
  apiUrl: string = ''

  constructor(private http: HttpClient, private appService: AppService) {
    this.apiUrl = appService.urlApiPdp
  }

  getIncomingInvoices(
    region: number,
    invoiceDate: string
  ): Observable<IIncoming[]> {
    const params = new HttpParams({
      fromObject: {region: region, data: invoiceDate},
    })
    return this.http.get<IIncoming[]>(`${this.apiUrl}prihod`, {params: params})
  }

  getOutgoingInvoices(invoice: number): Observable<IOutgoing[]> {
    const params = new HttpParams({
      fromObject: {invoice: invoice},
    })
    return this.http.get<IOutgoing[]>(`${this.apiUrl}rashod`, {params: params})
  }
}
