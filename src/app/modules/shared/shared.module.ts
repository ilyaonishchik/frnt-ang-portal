import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {FormsModule} from '@angular/forms'

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome'
import {
  NgbCollapseModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap'

import {DropdownComponent} from './components/dropdown/dropdown.component'
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component'
import {NavbarComponent} from './components/navbar/navbar.component'
import {UserComponent} from './components/navbar/user/user.component'
import {MessagesComponent} from './components/navbar/messages/messages.component'
import {NotificationsComponent} from './components/navbar/notifications/notifications.component'
import {SignComponent} from './components/navbar/sign/sign.component'
import {ModulesComponent} from './components/navbar/modules/modules.component'
import {BrandComponent} from './components/navbar/brand/brand.component'
import {DatepickerComponent} from './components/datepicker/datepicker.component'

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
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbCollapseModule,
    RouterModule,
    NgbDatepickerModule,
    FormsModule,
  ],
  exports: [NavbarComponent, DatepickerComponent],
})
export class SharedModule {}
