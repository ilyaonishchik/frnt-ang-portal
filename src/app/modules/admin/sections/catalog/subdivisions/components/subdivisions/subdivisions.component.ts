import {Component, OnDestroy, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IColumn} from '@shared/interfaces/column.interface'
import {LazyLoadEvent} from 'primeng/api'
import {TCrudAction} from '@shared/types/crud-action.type'
import {
  dialogCancelAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {IDeleteEvent} from '@shared/interfaces/event.interface'
import {ISubdivision} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'
import {
  dialogActionSelector,
  isLoadingSelector,
  subdivisionsSelector,
} from '@modules/admin/sections/catalog/subdivisions/store/selectors'
import {
  clearSubdivisionsStateAction,
  getSubdivisionsAction,
} from '@modules/admin/sections/catalog/subdivisions/store/actions/subdivisions.action'

@Component({
  selector: 'app-subdivisions',
  templateUrl: './subdivisions.component.html',
  styleUrls: ['./subdivisions.component.scss'],
})
export class SubdivisionsComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>
  items$!: Observable<ITableItems<ISubdivision> | null>
  dialog$!: Observable<ICrudAction | null>

  subjectName = 'подразделения'
  columns!: IColumn[]
  crudName = 'admin:subdivisions'
  keyField = 'id'
  sortField = 'id'
  confirmField = 'name_sd'

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
    this.fetchData()
  }

  private initializeValues(): void {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'parent', header: 'Родитель', width: 'w-2rem'},
      {field: 'name_st', header: 'Вид'},
      {field: 'name_sd', header: 'Наименование'},
      {field: 'name_sd_full', header: 'Наименование полное'},
      {field: 'name_sd_desc', header: 'Описание'},
    ]
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.items$ = this.store.select(subdivisionsSelector)
    this.dialog$ = this.store.select(dialogActionSelector)
  }

  private fetchData(): void {
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  loadItems(
    event: LazyLoadEvent | null,
    action: number = TCrudAction.NONE
  ): void {
    this.store.dispatch(
      getSubdivisionsAction({
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

  ngOnDestroy(): void {
    this.store.dispatch(clearSubdivisionsStateAction())
  }
}
