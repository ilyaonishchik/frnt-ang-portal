import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'
import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from '@shared/interfaces/column.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IMenu} from '../../interfaces/menu.interface'
import {
  dialogActionSelector,
  isLoadingSelector,
  menusSelector,
} from '../../store/selectors'
import {TCrudAction} from '@shared/types/crud-action.type'
import {
  dialogCancelAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {IDeleteEvent} from '@shared/interfaces/event.interface'
import {getMenusAction} from '../../store/actions/menus.action'

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss'],
})
export class MenusComponent implements OnInit {
  columns: IColumn[]
  crudName: string
  keyField: string
  sortField: string
  confirmField: string

  isLoading$!: Observable<boolean>
  items$!: Observable<ITableItems<IMenu> | null>
  dialog$!: Observable<ICrudAction | null>

  constructor(private store: Store) {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'label', header: 'Наименование'},
      {field: 'link', header: 'Ссылка'},
      {field: 'permission', header: 'Разрешение'},
      {field: 'icon', header: 'Иконка'},
    ]
    this.crudName = 'menu'
    this.keyField = 'id'
    this.sortField = 'id'
    this.confirmField = 'label'
  }

  ngOnInit(): void {
    this.initializeValues()
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.items$ = this.store.select(menusSelector)
    this.dialog$ = this.store.select(dialogActionSelector)
  }

  loadItems(
    event: LazyLoadEvent | null,
    action: number = TCrudAction.NONE
  ): void {
    this.store.dispatch(getMenusAction({event: event, action: action}))
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
