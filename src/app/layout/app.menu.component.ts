import {OnInit} from '@angular/core'
import {Component} from '@angular/core'
import {LayoutService} from './service/app.layout.service'

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: any[] = []

  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']},
        ],
      },
      {
        label: 'UI Components',
        items: [
          {
            label: 'Form Layout',
            icon: 'pi pi-fw pi-id-card',
            routerLink: ['/uikit/formlayout'],
          },
        ],
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/pages'],
        items: [
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login'],
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/auth/error'],
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/auth/access'],
              },
            ],
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/pages/crud'],
          },
        ],
      },
      {
        label: 'Hierarchy',
        items: [
          {
            label: 'Submenu 1',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              {
                label: 'Submenu 1.1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                  {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                  {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                ],
              },
              {
                label: 'Submenu 1.2',
                icon: 'pi pi-fw pi-bookmark',
                items: [{label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'}],
              },
            ],
          },
          {
            label: 'Submenu 2',
            icon: 'pi pi-fw pi-bookmark',
            items: [
              {
                label: 'Submenu 2.1',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                  {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                  {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                ],
              },
              {
                label: 'Submenu 2.2',
                icon: 'pi pi-fw pi-bookmark',
                items: [{label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'}],
              },
            ],
          },
        ],
      },
    ]
  }
}
