import {Injectable} from '@angular/core'
import {ILink, ILinks} from './link.interface'
import {HttpClient} from '@angular/common/http'
import {map, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
  apiUrl: string = 'assets/data/welcome.links.json'

  constructor(private http: HttpClient) {}

  getLinks(): Observable<ILink[]> {
    return this.http
      .get<ILinks>(this.apiUrl)
      .pipe(map((response: ILinks) => response.links))
  }
}
