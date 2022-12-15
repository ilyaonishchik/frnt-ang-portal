import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

import {environment} from 'environments/environment'
import {IDeleteResponse} from '@shared/interfaces/delete-response.interface'
import {
  IMenu,
  IMenuSave,
} from '../../../sections/portal/menus/interfaces/menu.interface'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly fullUrl: string

  constructor(private http: HttpClient) {
    this.fullUrl = `${environment.urlApi}/core/menus`
  }

  getMenu(id: number): Observable<IMenu> {
    return this.http.get<IMenu>(`${this.fullUrl}/${id}`)
  }

  createMenu(item: IMenu): Observable<IMenu> {
    return this.http.post<IMenu>(this.fullUrl, this.itemToSave(item))
  }

  updateMenu(id: number, item: IMenu): Observable<IMenu> {
    return this.http.put<IMenu>(`${this.fullUrl}/${id}`, this.itemToSave(item))
  }

  deleteMenu(id: number): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.fullUrl}/${id}`)
  }

  itemToSave(item: IMenu): IMenuSave {
    return {
      parent: item.parent,
      type: item.type,
      label: item.label,
      icon: item.icon,
      separator: item.separator,
      permission: item.permission,
      link: item.link,
      comment: item.comment,
      sort: item.sort,
      status: item.status,
    }
  }
}
