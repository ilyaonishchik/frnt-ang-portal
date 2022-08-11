import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {DropdownComponent} from './components/dropdown/dropdown.component'
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component'
import {NavbarComponent} from './components/navbar/navbar.component'
import {UserComponent} from './components/navbar/user/user.component'
import {MessagesComponent} from './components/navbar/messages/messages.component'
import {NotificationsComponent} from './components/navbar/notifications/notifications.component'
import {SignComponent} from './components/navbar/sign/sign.component'
import {ModulesComponent} from './components/navbar/modules/modules.component'
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap'
import {RouterModule} from '@angular/router'
import {BrandComponent} from './components/navbar/brand/brand.component'

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownMenuComponent,
    NavbarComponent,
    UserComponent,
    MessagesComponent,
    NotificationsComponent,
    SignComponent,
    ModulesComponent,
    BrandComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, NgbCollapseModule, RouterModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
