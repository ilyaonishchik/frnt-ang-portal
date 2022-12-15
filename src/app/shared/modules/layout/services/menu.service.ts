import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

import {Observable, Subject} from 'rxjs'

import {IMenuChangeEvent} from '@shared/interfaces/menu-change-event.interface'
import {IMenu} from '@shared/interfaces/menu.interface'
import {environment} from 'environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSource = new Subject<IMenuChangeEvent>()
  private resetSource = new Subject()

  menuSource$ = this.menuSource.asObservable()
  resetSource$ = this.resetSource.asObservable()

  constructor(private http: HttpClient) {}

  onMenuStateChange(event: IMenuChangeEvent) {
    this.menuSource.next(event)
  }

  reset() {
    this.resetSource.next(true)
  }

  getItems(menuType: number): Observable<IMenu[]> {
    const menuUrl = `${environment.urlApi}/core/menus/show/${menuType}`
    return this.http.get<IMenu[]>(menuUrl)
  }
}
