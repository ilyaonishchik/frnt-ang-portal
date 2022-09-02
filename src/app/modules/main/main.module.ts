import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {CardModule} from 'primeng/card'
import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'

import {MainRoutingModule} from './main-routing.module'
import {WelcomeComponent} from './welcome/welcome.component'
import {DefaultComponent} from './default/default.component'

@NgModule({
  declarations: [WelcomeComponent, DefaultComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    CardModule,
    ButtonModule,
    TooltipModule,
  ],
})
export class MainModule {}
