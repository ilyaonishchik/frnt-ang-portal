import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'
import {InputTextModule} from 'primeng/inputtext'
import {DialogModule} from 'primeng/dialog'

import {TableComponent} from './components/table/table.component'
import {StatusComponent} from './components/columns/status/status.component'
import {ActionsComponent as ColumnsActionsComponent} from './components/columns/actions/actions.component'
import {PipesModule} from '@shared/modules/pipes/pipes.module'

@NgModule({
  declarations: [TableComponent, StatusComponent, ColumnsActionsComponent],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    InputTextModule,
    DialogModule,
    PipesModule,
  ],
  exports: [TableComponent],
})
export class AvsTableModule {}
