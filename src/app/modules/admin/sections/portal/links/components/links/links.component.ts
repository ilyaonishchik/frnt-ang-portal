import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable} from 'rxjs'

import {Store} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from '@shared/interfaces/column.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {ILink} from '../../interfaces/link.interface'
import {TCrudAction} from '@shared/types/crud-action.type'
import {
  dialogActionSelector,
  isLoadingSelector,
  linksSelector,
} from '../../store/selectors'

import {
  clearLinksStateAction,
  getLinksAction,
} from '../../store/actions/links.action'
import {
  dialogCancelAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {IDeleteEvent} from '@shared/interfaces/event.interface'

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>
  items$!: Observable<ITableItems<ILink> | null>
  dialog$!: Observable<ICrudAction | null>

  subjectName = 'ссылки'
  columns!: IColumn[]
  crudName = 'admin:core-link'
  keyField = 'id'
  sortField = 'id'
  confirmField = 'name'

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
    this.fetchData()
  }

  private initializeValues(): void {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'name', header: 'Наименование'},
      {field: 'comment', header: 'Описание'},
      {field: 'sort', header: 'Очередность'},
    ]
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.items$ = this.store.select(linksSelector)
    this.dialog$ = this.store.select(dialogActionSelector)
  }

  private fetchData(): void {
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  loadItems(
    event: LazyLoadEvent | null,
    action: number = TCrudAction.NONE
  ): void {
    this.store.dispatch(getLinksAction({event: event, action: action}))
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

  ngOnDestroy(): void {
    this.store.dispatch(clearLinksStateAction())
  }
}
