import {Component, OnInit} from '@angular/core'

import {Store} from '@ngrx/store'

import {
  dialogCancelAction,
  dialogShowAction,
} from '../../../../store/actions/dialogs.action'
import {TCrudAction} from '../../../../types/crud-action.type'
import {IDeleteEvent} from '../../../../interfaces/event.interface'

@Component({
  selector: 'avs-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})
export class ListItemsComponent implements OnInit {
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
}
