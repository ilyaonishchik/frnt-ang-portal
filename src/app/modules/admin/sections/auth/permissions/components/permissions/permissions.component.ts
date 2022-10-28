import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {getPermissionsAction} from '../../store/actions/permissions.action'

import {
  dialogActionSelector,
  isLoadingSelector,
  permissionsSelector,
} from '../../store/selectors'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {
  dialogCancelAction,
  dialogShowAction,
} from '../../store/actions/dialogs.action'
import {ICrudAction} from 'src/app/shared/interfaces/crud-action.interface'
import {IDeleteEvent} from 'src/app/shared/interfaces/event.interface'
import {TCrudAction} from 'src/app/shared/types/crud-action.type'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  columns: IColumn[]
  crudName: string
  keyField: string
  sortField: string
  confirmField: string

  isLoading$!: Observable<boolean>
  permissions$!: Observable<ITableItems<IPermission> | null>
  dialog$!: Observable<ICrudAction | null>

  constructor(private store: Store) {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'code', header: 'Код'},
      {field: 'name', header: 'Наименование'},
    ]
    this.crudName = 'permission'
    this.keyField = 'id'
    this.sortField = 'id'
    this.confirmField = 'code'
  }

  ngOnInit(): void {
    this.initializeValues()
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.permissions$ = this.store.pipe(select(permissionsSelector))
    this.dialog$ = this.store.pipe(select(dialogActionSelector))
  }

  loadItems(
    event: LazyLoadEvent | null,
    action: number = TCrudAction.NONE
  ): void {
    this.store.dispatch(
      getPermissionsAction({
        event: event,
        action: action,
      })
    )
  }

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
