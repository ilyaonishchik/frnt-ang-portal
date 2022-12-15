import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'

import {LinksRoutingModule} from './links-routing.module'
import {LinksComponent} from './components/links/links.component'
import {linksFeatureKey, reducerLinks} from './store/reducers'
import {GetLinksEffect} from './store/effects/links.effect'
import {AvsTableModule} from '@shared/modules/table/table.module'
import {LinkModule} from '../../../components/link/link.module'

@NgModule({
  declarations: [LinksComponent],
  imports: [
    CommonModule,
    LinksRoutingModule,
    StoreModule.forFeature(linksFeatureKey, reducerLinks),
    EffectsModule.forFeature([GetLinksEffect]),
    AvsTableModule,
    LinkModule,
  ],
})
export class LinksModule {}
