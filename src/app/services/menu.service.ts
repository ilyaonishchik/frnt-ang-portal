import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {IMenuChangeEvent} from '../types/menuchangeevent'
import {IMenu} from '../types/menu'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuSource = new Subject<IMenuChangeEvent>()
  private resetSource = new Subject()
  menuItems: IMenu[] = []

  menuSource$ = this.menuSource.asObservable()
  resetSource$ = this.resetSource.asObservable()

  constructor() {}

  onMenuStateChange(event: IMenuChangeEvent) {
    this.menuSource.next(event)
  }

  reset() {
    this.resetSource.next(true)
  }

  // getMenuItems(menuType: number): Observable<IMenu[]> {
  //   return this.http.get<IMenu[]>('')
  // }

  loadMenuItems(menuType: number): void {
    console.log('loadMenuItems for type: %s', menuType)
    switch (menuType) {
      case 0: {
        this.menuItems = [
          {
            label: 'Главная',
            items: [
              {
                label: 'Ссылки',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/welcome'],
              },
              {
                label: 'Админка',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/admin'],
              },
            ],
          },
          {
            label: 'Подписка',
            // icon: 'pi pi-fw pi-home',
            // routerLink: ['/pdp'],
            items: [
              {label: 'Главная', routerLink: ['/pdp']},
              {label: 'Сортировка', routerLink: ['/pdp/srt']},
            ],
          },
        ]
        break
      }
      case 1: {
        this.menuItems = [
          {
            label: 'Главная',
            items: [
              {
                label: 'Welcome',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/welcome'],
              },
              {
                label: 'Main',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/admin'],
              },
              {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/admin/dashboard'],
              },
              {
                label: 'Пользователи',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/admin/users'],
              },
            ],
          },
        ]
        break
      }
    }
  }
}