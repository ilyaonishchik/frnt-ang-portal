import {Component, Input, OnChanges, OnInit} from '@angular/core'

import {MenuService} from '../../../../services/menu.service'
// import {Observable} from 'rxjs'
// import {IMenu} from '../../../../types/menu'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() menuType: number = 0
  // menuItems$?: Observable<IMenu[]>

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    // this.menuItems$ = this.menuService.getMenuItems(this.menuType)
    this.menuService.loadMenuItems(this.menuType)
  }
}
