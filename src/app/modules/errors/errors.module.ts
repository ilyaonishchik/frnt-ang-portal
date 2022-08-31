import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {ButtonModule} from 'primeng/button'

import {ErrorsRoutingModule} from './errors-routing.module'
import {Page403Component} from './components/page403/page403.component'
import {Page404Component} from './components/page404/page404.component'
import {Page500Component} from './components/page500/page500.component'

@NgModule({
  declarations: [Page403Component, Page404Component, Page500Component],
  imports: [CommonModule, ErrorsRoutingModule, ButtonModule],
})
export class ErrorsModule {}
