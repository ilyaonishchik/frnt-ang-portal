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
import {NgxFilesizeModule} from 'ngx-filesize'

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
    DataViewModule,
    DropdownModule,
    FormsModule,
    NgxFilesizeModule,
  ],
})
export class DocumentsModule {}
