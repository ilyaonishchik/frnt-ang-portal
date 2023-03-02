import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {DocumentsRoutingModule} from './documents-routing.module'
import {MainComponent} from './components/main/main.component'
import {TreeModule} from 'primeng/tree'
import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'
import {InputTextModule} from 'primeng/inputtext'
import {DataViewModule} from 'primeng/dataview'
import {DropdownModule} from 'primeng/dropdown'
import {FormsModule} from '@angular/forms'
import {PipesModule} from '@shared/modules/pipes/pipes.module'
import {StoreModule} from '@ngrx/store'
import {docsFeatureKey, reducerDocs} from '@modules/documents/store/reducers'
import {EffectsModule} from '@ngrx/effects'
import {GetDocsEffect} from '@modules/documents/store/effects/docs.effect'

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    StoreModule.forFeature(docsFeatureKey, reducerDocs),
    EffectsModule.forFeature([GetDocsEffect]),
    TreeModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    DataViewModule,
    DropdownModule,
    FormsModule,
    PipesModule,
  ],
})
export class DocumentsModule {}
