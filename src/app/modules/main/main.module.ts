import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'

import {MainRoutingModule} from './main-routing.module'
import {LoadingModule} from '@shared/modules/loading/loading.module'

import {WelcomeComponent} from './components/welcome/welcome.component'
import {DefaultComponent} from './components/default/default.component'
import {mainFeatureKey, reducerMain} from './store/reducers'
import {GetLinksEffect} from './store/effects/links.effect'

@NgModule({
  declarations: [WelcomeComponent, DefaultComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    StoreModule.forFeature(mainFeatureKey, reducerMain),
    EffectsModule.forFeature([GetLinksEffect]),
    ButtonModule,
    TooltipModule,
    LoadingModule,
  ],
})
export class MainModule {}
