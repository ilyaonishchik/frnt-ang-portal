import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {MenusRoutingModule} from './menus-routing.module'
import {MenusComponent} from './components/menus/menus.component'
import {AvsTableModule} from '@shared/modules/table/table.module'
import {menusFeatureKey, reducerMenus} from './store/reducers'
import {GetMenusEffect} from './store/effects/links.effect'
import {MenuModule} from '../../../components/portal/menu/menu.module'

@NgModule({
  declarations: [MenusComponent],
  imports: [
    CommonModule,
    MenusRoutingModule,
    AvsTableModule,
    StoreModule.forFeature(menusFeatureKey, reducerMenus),
    EffectsModule.forFeature([GetMenusEffect]),
    MenuModule,
  ],
})
export class MenusModule {}
