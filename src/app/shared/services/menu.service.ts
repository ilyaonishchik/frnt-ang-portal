import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {map, Observable, Subject} from 'rxjs'

import {IMenu, IMenus} from '../types/menu.interface'
import {IMenuChangeEvent} from '../types/menuchangeevent'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiMainUrl: string = 'assets/data/menu.main.json'
  private apiAdminUrl: string = 'assets/data/menu.admin.json'
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
    let menuUrl: string = ''
    switch (menuType) {
      case 0: {
        menuUrl = this.apiMainUrl
        break
      }
      case 1: {
        menuUrl = this.apiAdminUrl
        break
      }
    }
    return this.http
      .get<IMenus>(menuUrl)
      .pipe(map((response: IMenus) => response.items))
  }
}
