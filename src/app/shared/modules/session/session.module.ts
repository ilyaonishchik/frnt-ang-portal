import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {
  reducerSession,
  sessionFeatureKey,
} from '../../store/reducers/session.reducer'
import {SessionEffects} from '../../store/effects/session.effects'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(sessionFeatureKey, reducerSession),
    EffectsModule.forFeature([SessionEffects]),
  ],
})
export class SessionModule {}
