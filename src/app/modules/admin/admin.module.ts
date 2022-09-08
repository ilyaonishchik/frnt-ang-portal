import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {AdminRoutingModule} from './admin-routing.module'

import {MainComponent} from './components/main/main.component'

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [],
})
export class AdminModule {}
