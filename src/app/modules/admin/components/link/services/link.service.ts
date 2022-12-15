import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {
  ILink,
  ILinkSave,
} from '../../../sections/portal/links/interfaces/link.interface'

@Injectable({
  providedIn: 'root',
})
export class LinkService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/core/links`
  }

  getLink(id: number): Observable<ILink> {
    return this.http.get<ILink>(`${this.fullUrl}/${id}`)
  }

  createLink(item: ILink): Observable<ILink> {
    return this.http.post<ILink>(this.fullUrl, this.itemToSave(item))
  }

  updateLink(id: number, item: ILink): Observable<ILink> {
    return this.http.put<ILink>(`${this.fullUrl}/${id}`, this.itemToSave(item))
  }

  deleteLink(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  itemToSave(item: ILink): ILinkSave {
    return {
      name: item.name,
      website: item.website,
      comment: item.comment,
      sort: item.sort,
      status: item.status,
    }
  }
}
