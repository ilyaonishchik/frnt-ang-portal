import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'environments/environment'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {eventAction, eventToParams} from '@shared/functions/event.function'
import {IUserFull} from '@shared/interfaces/user.interface'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/auth/users`
  }

  getUsers(
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<IUserFull>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)

    return this.http.get<IResponseItems<IUserFull>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
