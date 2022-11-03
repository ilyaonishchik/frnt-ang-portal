import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'

import {CardModule} from 'primeng/card'
import {CalendarModule} from 'primeng/calendar'
import {DropdownModule} from 'primeng/dropdown'
import {InputTextModule} from 'primeng/inputtext'
import {MessagesModule} from 'primeng/messages'

import {PodpiskaRoutingModule} from './podpiska-routing.module'
import {MainComponent} from './components/main/main.component'
import {SortirovkaComponent} from './components/sortirovka/sortirovka.component'

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
    MessagesModule,
  ],
})
export class PodpiskaModule {}
