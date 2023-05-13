import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {SubdivisionsRoutingModule} from './subdivisions-routing.module'
import {SubdivisionsComponent} from './components/subdivisions/subdivisions.component'
import {AvsTableModule} from '@shared/modules/table/table.module'
import {EffectsModule} from '@ngrx/effects'
import {GetSubdivisionsEffect} from '@modules/admin/sections/catalog/subdivisions/store/effects/subdivisions'
import {StoreModule} from '@ngrx/store'
import {
  reducerSubdivisions,
  subdivisionsFeatureKey,
} from '@modules/admin/sections/catalog/subdivisions/store/reducers/subdivisions'
import {GetSubdivisionTypesEffects} from '@modules/admin/sections/catalog/subdivisions/store/effects/subdivision-types'
import {
  reducerSubdivisionTypes,
  subdivisionTypesFeatureKey,
} from '@modules/admin/sections/catalog/subdivisions/store/reducers/subdivision-types';
import { SubdivisionTypesComponent } from './components/subdivision-types/subdivision-types.component'

@NgModule({
  declarations: [SubdivisionsComponent, SubdivisionTypesComponent],
  imports: [
    CommonModule,
    SubdivisionsRoutingModule,
    EffectsModule.forFeature([
      GetSubdivisionsEffect,
      GetSubdivisionTypesEffects,
    ]),
    StoreModule.forFeature(subdivisionsFeatureKey, reducerSubdivisions),
    StoreModule.forFeature(subdivisionTypesFeatureKey, reducerSubdivisionTypes),
    AvsTableModule,
  ],
})
export class SubdivisionsModule {}
