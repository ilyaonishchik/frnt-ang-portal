import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {PodpiskaRoutingModule} from './podpiska-routing.module'
import {MainComponent} from './components/main/main.component'

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, PodpiskaRoutingModule],
})
export class PodpiskaModule {}
