import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {ILink} from '../interfaces/link.interface'
import {environment} from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
  constructor(private http: HttpClient) {}

  getLinks(): Observable<ILink[]> {
    return this.http.get<ILink[]>(`${environment.urlApiCore}/links/show`)
  }
}
