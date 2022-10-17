import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'
import {InputTextModule} from 'primeng/inputtext'

import {TableComponent} from './components/table/table.component'
import {StatusComponent} from './components/columns/status/status.component'
import {ActionsComponent} from './components/columns/actions/actions.component'

@NgModule({
  declarations: [TableComponent, StatusComponent, ActionsComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
  ],
  exports: [TableComponent],
})
export class AvsTableModule {}
