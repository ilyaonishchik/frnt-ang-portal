import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Store} from '@ngrx/store'
import {LazyLoadEvent} from 'primeng/api'

import {
  dialogCancelAction,
  dialogShowAction,
} from '../../../../store/actions/dialogs.action'
import {TCrudAction} from '../../../../types/crud-action.type'
import {IDeleteEvent} from '../../../../interfaces/event.interface'
import {IColumn} from '../../../../interfaces/column.interface'
import {ICrudAction} from '../../../../interfaces/crud-action.interface'
import {ITableItems} from '../../../../interfaces/table-items.interface'

@Component({
  selector: 'avs-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
  @Input('columns') columns: IColumn[] = []
  @Input('crudName') crudName: string | null = null
  @Input('keyField') keyField: string = 'id'
  @Input('sortField') sortField: string = 'id'
  @Input('confirmField') confirmField: string = 'id'
  @Input('filterFields') filterFields: string[] = []

  @Input('isLoading') isLoading: boolean = false
  @Input('dialog') dialog: ICrudAction | null = null
  @Input('items') items: ITableItems<any> | null = null

  @Output('onLazyLoad') onLazyLoad = new EventEmitter<LazyLoadEvent>()

  constructor(private store: Store) {}

  ngOnInit(): void {}

  createItem(): void {
    this.store.dispatch(
      dialogShowAction({crud: {id: null, action: TCrudAction.CREATE}})
    )
  }

  readItem(id: number): void {
    this.store.dispatch(
      dialogShowAction({crud: {id: id, action: TCrudAction.READ}})
    )
  }

  updateItem(id: number): void {
    this.store.dispatch(
      dialogShowAction({crud: {id: id, action: TCrudAction.UPDATE}})
    )
  }

  deleteItem(event: IDeleteEvent): void {
    this.store.dispatch(
      dialogShowAction({
        crud: {
          id: event.id,
          action: TCrudAction.DELETE,
          confirm: event.confirm,
        },
      })
    )
  }

  hideDialog(): void {
    this.store.dispatch(dialogCancelAction())
  }

  loadItems(event: LazyLoadEvent): void {
    this.onLazyLoad.emit(event)
  }
}
