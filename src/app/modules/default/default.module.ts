import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {DefaultRoutingModule} from './default-routing.module'
import {MainComponent} from './components/main/main.component'
import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, DefaultRoutingModule, SharedModule],
})
export class DefaultModule {}
