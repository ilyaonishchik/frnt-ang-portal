import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {ListItemsComponent} from './components/list-items/list-items.component'
import {AvsTableModule} from '../table/table.module'

@NgModule({
  declarations: [ListItemsComponent],
  imports: [CommonModule, AvsTableModule],
  exports: [ListItemsComponent],
})
export class ListItemsModule {}
