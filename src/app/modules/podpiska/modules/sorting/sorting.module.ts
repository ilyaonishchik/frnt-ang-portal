import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {CalendarModule} from 'primeng/calendar'
import {InputTextModule} from 'primeng/inputtext'
import {DropdownModule} from 'primeng/dropdown'
import {MessagesModule} from 'primeng/messages'
import {ToggleButtonModule} from 'primeng/togglebutton'

import {SortingRoutingModule} from './sorting-routing.module'
import {LoadingModule} from '@shared/modules/loading/loading.module'
import {ValidateModule} from '@shared/modules/validate/validate.module'

import {SortingComponent} from './components/sorting/sorting.component'
import {pdpSrtFeatureKey, reducerPdpSrt} from './store/reducers'
import {GetPeriodicalsEffect} from './store/effects/periodicals.effect'
import {GetCellsEffect} from './store/effects/cells.effect'

@NgModule({
  declarations: [SortingComponent],
  imports: [
    CommonModule,
    SortingRoutingModule,
    StoreModule.forFeature(pdpSrtFeatureKey, reducerPdpSrt),
    EffectsModule.forFeature([GetPeriodicalsEffect, GetCellsEffect]),
    CalendarModule,
    InputTextModule,
    DropdownModule,
    MessagesModule,
    FormsModule,
    LoadingModule,
    ValidateModule,
    ToggleButtonModule,
  ],
})
export class SortingModule {}
