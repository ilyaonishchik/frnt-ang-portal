import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {PodpiskaRoutingModule} from './podpiska-routing.module'
import {MainComponent} from './components/main/main.component'
import {SortirovkaComponent} from './components/sortirovka/sortirovka.component'
import {CardModule} from 'primeng/card'
import {CalendarModule} from 'primeng/calendar'
import {DropdownModule} from 'primeng/dropdown'
import {FormsModule} from '@angular/forms'
import {InputTextModule} from 'primeng/inputtext'

@NgModule({
  declarations: [MainComponent, SortirovkaComponent],
  imports: [
    CommonModule,
    PodpiskaRoutingModule,
    CardModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
  ],
})
export class PodpiskaModule {}
