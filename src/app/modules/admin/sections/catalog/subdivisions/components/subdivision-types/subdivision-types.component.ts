import {Component, OnDestroy, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ISubdivisionType} from '@modules/admin/sections/catalog/subdivisions/interfaces/subdivision.interface'
import {IColumn} from '@shared/interfaces/column.interface'
import {TCrudAction} from '@shared/types/crud-action.type'
import {LazyLoadEvent} from 'primeng/api'
import {
  clearSubdivisionTypesStateAction,
  getSubdivisionTypesAction,
} from '@modules/admin/sections/catalog/subdivisions/store/actions/subdivision-types.action'
import {
  dialogCancelAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {IDeleteEvent} from '@shared/interfaces/event.interface'
import {
  dialogActionSelector,
  isLoadingSelector,
  subdivisionTypesSelector,
} from '@modules/admin/sections/catalog/subdivisions/store/selectors/subdivision-types'

@Component({
  selector: 'app-subdivision-types',
  templateUrl: './subdivision-types.component.html',
  styleUrls: ['./subdivision-types.component.scss'],
})
export class SubdivisionTypesComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>
  items$!: Observable<ITableItems<ISubdivisionType> | null>
  dialog$!: Observable<ICrudAction | null>

  subjectName = 'типа подразделения'
  columns!: IColumn[]
  crudName = 'admin:subdivision-types'
  keyField = 'id'
  sortField = 'id'
  confirmField = 'name_st'

  constructor(private store: Store) {}
  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
    this.fetchData()
  }

  private initializeValues(): void {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'name_st', header: 'Наименование'},
      {field: 'name_st_full', header: 'Наименование полное'},
      {field: 'name_st_desc', header: 'Описание'},
    ]
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.items$ = this.store.select(subdivisionTypesSelector)
    this.dialog$ = this.store.select(dialogActionSelector)
  }

  private fetchData(): void {
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  loadItems(event: LazyLoadEvent | null, action = TCrudAction.NONE): void {
    this.store.dispatch(
      getSubdivisionTypesAction({
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
    this.store.dispatch(clearSubdivisionTypesStateAction())
  }
}
