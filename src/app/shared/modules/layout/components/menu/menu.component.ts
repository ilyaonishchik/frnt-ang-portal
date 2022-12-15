import {Component, Input, OnChanges} from '@angular/core'
import {map, Observable} from 'rxjs'

import {IMenu} from '@shared/interfaces/menu.interface'
import {MenuService} from '../../services/menu.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnChanges {
  @Input() menuType = 0
  menuItems$?: Observable<IMenu[]>

  constructor(public menuService: MenuService) {}

  ngOnChanges(): void {
    this.menuItems$ = this.menuService.getItems(this.menuType).pipe(
      map((items) => {
        return items
      })
    )
  }
}
