import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'
import {InputTextModule} from 'primeng/inputtext'

import {TableComponent} from './components/table/table.component'
import {StatusComponent} from './components/columns/status/status.component'
import {ActionsComponent as ColumnsActionsComponent} from './components/columns/actions/actions.component'
import {
  ActionsComponent,
  ActionsComponent as DialogActionsComponent,
} from './components/dialog/actions/actions.component'
import {
  DeleteComponent,
  DeleteComponent as DialogDeleteComponent,
} from './components/dialog/delete/delete.component'

@NgModule({
  declarations: [
    TableComponent,
    StatusComponent,
    ColumnsActionsComponent,
    DialogActionsComponent,
    DialogDeleteComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
  ],
  exports: [TableComponent, ActionsComponent, DeleteComponent],
})
export class AvsTableModule {}
