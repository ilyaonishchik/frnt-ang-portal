import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {TooltipModule} from 'primeng/tooltip'
import {BadgeModule} from 'primeng/badge'
import {DividerModule} from 'primeng/divider'
import {RippleModule} from 'primeng/ripple'

import {TopbarComponent} from './components/topbar/topbar.component'
import {LayoutComponent} from './components/layout/layout.component'
import {MenuitemComponent} from './components/menuitem/menuitem.component'
import {MenuComponent} from './components/menu/menu.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {FooterComponent} from './components/footer/footer.component'
import {reducer} from '../modules/auth/store/reducers'
import {SigninEffect} from '../modules/auth/store/effects/signin.effect'
import {GetCurrentUserEffect} from '../modules/auth/store/effects/get-current-user.effect'
import {SignoutEffect} from '../modules/auth/store/effects/signout.effect'
import {GetAllRolesEffect} from '../modules/auth/store/effects/get-all-roles.effect'
import {GetAllPermissionsEffect} from '../modules/auth/store/effects/get-all-permissions.effect'
import {ProgressBarModule} from 'primeng/progressbar'

@NgModule({
  declarations: [
    TopbarComponent,
    LayoutComponent,
    MenuitemComponent,
    MenuComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    TooltipModule,
    BadgeModule,
    DividerModule,
    RippleModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([
      SigninEffect,
      GetCurrentUserEffect,
      SignoutEffect,
      GetAllRolesEffect,
      GetAllPermissionsEffect,
    ]),
    ProgressBarModule,
  ],
  exports: [TopbarComponent],
})
export class SharedModule {}
