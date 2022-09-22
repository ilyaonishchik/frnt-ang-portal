import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TopbarComponent} from './components/topbar/topbar.component'
import {LayoutComponent} from './components/layout/layout.component'
import {BrowserModule} from '@angular/platform-browser'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {TooltipModule} from 'primeng/tooltip'
import {RouterModule} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'
import {BadgeModule} from 'primeng/badge'
import {DividerModule} from 'primeng/divider'
import {MenuitemComponent} from './components/menuitem/menuitem.component'
import {RippleModule} from 'primeng/ripple'
import {MenuComponent} from './components/menu/menu.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {FooterComponent} from './components/footer/footer.component'

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
  ],
  exports: [LayoutComponent, TopbarComponent],
})
export class SharedModule {}
