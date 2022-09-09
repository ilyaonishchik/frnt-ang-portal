import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  model: any[] = []

  constructor() {}

  ngOnInit(): void {
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
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/'],
        items: [
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/sign-in'],
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/error/500'],
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/error/403'],
              },
            ],
          },
          {
            label: 'Crud',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/'],
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
