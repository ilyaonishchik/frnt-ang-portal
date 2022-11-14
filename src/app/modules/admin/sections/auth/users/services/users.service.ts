import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {IResponseItems} from 'src/app/shared/interfaces/response-items.interface'
import {TCrudAction} from 'src/app/shared/types/crud-action.type'
import {eventToParams} from 'src/app/shared/functions/event.function'
import {IUser} from 'src/app/shared/interfaces/user.interface'

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
  ): Observable<IResponseItems<IUser>> {
    if (event) {
      this.previousEvent = event
    }
    switch (previousAction) {
      case TCrudAction.CREATE: {
        if (this.previousEvent) {
          this.previousEvent.first = 0
        }
        break
      }
      case TCrudAction.DELETE: {
        if (this.previousEvent) {
          this.previousEvent.first = 0
        }
        break
      }
    }
    return this.http.get<IResponseItems<IUser>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
