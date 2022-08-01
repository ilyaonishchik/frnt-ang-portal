import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {NgbCollapseModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import {AdminRoutingModule} from './admin-routing.module'

import {MainComponent} from './components/main/main.component'
import {NavbarComponent} from './components/navbar/navbar.component'
import {SidebarComponent} from './components/sidebar/sidebar.component'
import {BrandComponent} from './components/navbar/brand/brand.component'
import {ModulesComponent} from './components/navbar/modules/modules.component'
import {MessagesComponent} from './components/navbar/messages/messages.component'
import {NotificationsComponent} from './components/navbar/notifications/notifications.component'
import {UserComponent} from './components/navbar/user/user.component'

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    BrandComponent,
    ModulesComponent,
    MessagesComponent,
    NotificationsComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    NgbDropdownModule,
    NgbCollapseModule,
  ],
})
export class AdminModule {}
