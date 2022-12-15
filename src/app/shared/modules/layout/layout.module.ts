import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {RippleModule} from 'primeng/ripple'
import {TooltipModule} from 'primeng/tooltip'
import {BadgeModule} from 'primeng/badge'
import {DividerModule} from 'primeng/divider'

import {LayoutComponent} from './components/layout/layout.component'
import {TopbarComponent} from './components/topbar/topbar.component'
import {FooterComponent} from './components/footer/footer.component'
import {MenuComponent} from './components/menu/menu.component'
import {MenuitemComponent} from './components/menuitem/menuitem.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {authFeatureKey, reducerAuth} from '@modules/auth/store/reducers'
import {GetCurrentUserEffect} from '@modules/auth/store/effects/get-current-user.effect'
import {SignoutEffect} from '@modules/auth/store/effects/signout.effect'

@NgModule({
  declarations: [
    LayoutComponent,
    TopbarComponent,
    FooterComponent,
    MenuComponent,
    MenuitemComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLink,
    RouterLinkActive,
    RippleModule,
    RouterOutlet,
    HttpClientModule,
    TooltipModule,
    BadgeModule,
    DividerModule,
    StoreModule.forFeature(authFeatureKey, reducerAuth),
    EffectsModule.forFeature([GetCurrentUserEffect, SignoutEffect]),
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {}
