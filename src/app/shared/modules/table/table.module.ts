import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {TableComponent} from './components/table/table.component'
import {TableModule} from 'primeng/table'
import {ButtonModule} from 'primeng/button'
import {TooltipModule} from 'primeng/tooltip'
import {InputTextModule} from 'primeng/inputtext'

@NgModule({
  declarations: [TableComponent],
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
