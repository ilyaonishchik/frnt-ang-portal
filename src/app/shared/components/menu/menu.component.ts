import {Component, Input, OnChanges, OnInit} from '@angular/core'

import {Observable} from 'rxjs'
import {IMenu} from '../../types/menu.interface'
import {MenuService} from '../../services/menu.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() menuType: number = 0
  menuItems$?: Observable<IMenu[]>

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    console.log('MenuComponent ngOnChanges')
    this.menuItems$ = this.menuService.getItems(this.menuType)
  }
}