import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {DocumentsRoutingModule} from './documents-routing.module'
import {MainComponent} from './components/main/main.component'
import {TreeModule} from 'primeng/tree'
import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'
import {InputTextModule} from 'primeng/inputtext'

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    TreeModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
  ],
})
export class DocumentsModule {}
