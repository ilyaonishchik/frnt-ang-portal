import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ListItemsComponent} from './components/list-items/list-items.component'
import {AvsTableModule} from '../table/table.module'
import {ListItemReadComponent} from './components/list-item-read/list-item-read.component'
import {DialogModule} from 'primeng/dialog'
import {LoadingModule} from '../loading/loading.module'
import {CheckboxModule} from 'primeng/checkbox'
import {ButtonModule} from 'primeng/button'
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [ListItemsComponent, ListItemReadComponent],
  imports: [
    CommonModule,
    AvsTableModule,
    DialogModule,
    LoadingModule,
    CheckboxModule,
    ButtonModule,
    FormsModule,
  ],
  exports: [ListItemsComponent],
})
export class ListItemsModule {}
