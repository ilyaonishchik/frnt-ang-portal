import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {MainRoutingModule} from './main-routing.module'
import {WelcomeComponent} from './welcome/welcome.component'
import {DefaultComponent} from './default/default.component'
import {CardModule} from 'primeng/card'

@NgModule({
  declarations: [WelcomeComponent, DefaultComponent],
  imports: [CommonModule, MainRoutingModule, CardModule],
})
export class MainModule {}
