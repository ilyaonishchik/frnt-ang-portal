import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {SubdivisionsRoutingModule} from './subdivisions-routing.module'
import {SubdivisionsComponent} from './components/subdivisions/subdivisions.component'
import {AvsTableModule} from '@shared/modules/table/table.module'
import {EffectsModule} from '@ngrx/effects'
import {GetSubdivisionsEffect} from '@modules/admin/sections/catalog/subdivisions/store/effects/subdivisions.effect'
import {StoreModule} from '@ngrx/store'
import {
  reducerSubdivisions,
  subdivisionsFeatureKey,
} from '@modules/admin/sections/catalog/subdivisions/store/reducers'

@NgModule({
  declarations: [SubdivisionsComponent],
  imports: [
    CommonModule,
    SubdivisionsRoutingModule,
    EffectsModule.forFeature([GetSubdivisionsEffect]),
    StoreModule.forFeature(subdivisionsFeatureKey, reducerSubdivisions),
    AvsTableModule,
  ],
})
export class SubdivisionsModule {}
