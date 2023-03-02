import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'environments/environment'
import {IResponseItems} from '@shared/interfaces/response-items.interface'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'
import {eventAction, eventToParams} from '@shared/functions/event.function'

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private readonly fullUrl: string
  previousEvent: LazyLoadEvent = {first: 0}

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApiStorage}/files`
  }

  getFiles(
    event: LazyLoadEvent | null,
    previousAction: number
  ): Observable<IResponseItems<IFile>> {
    this.previousEvent = eventAction(event, this.previousEvent, previousAction)
    return this.http.get<IResponseItems<IFile>>(this.fullUrl, {
      params: eventToParams(this.previousEvent),
    })
  }
}
