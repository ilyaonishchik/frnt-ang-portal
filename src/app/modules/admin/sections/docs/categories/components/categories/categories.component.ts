import {Component, OnInit} from '@angular/core'
import {IColumn} from '@shared/interfaces/column.interface'
import {Observable} from 'rxjs'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {Store} from '@ngrx/store'
import {
  categoriesSelector,
  dialogActionSelector,
  isLoadingSelector,
} from '@modules/admin/sections/docs/categories/store/selectors'
import {LazyLoadEvent} from 'primeng/api'
import {TCrudAction} from '@shared/types/crud-action.type'
import {getCategoriesAction} from '@modules/admin/sections/docs/categories/store/actions/categories.action'
import {IDeleteEvent} from '@shared/interfaces/event.interface'
import {
  dialogCancelAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  columns: IColumn[]
  crudName: string
  keyField: string
  sortField: string
  confirmField: string

  isLoading$!: Observable<boolean>
  items$!: Observable<ITableItems<ICategory> | null>
  dialog$!: Observable<ICrudAction | null>

  constructor(private store: Store) {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'parent', header: 'Parent', width: 'w-2rem'},
      {field: 'cat_name', header: 'Наименование'},
      {field: 'cat_desc', header: 'Описание'},
    ]
    this.crudName = 'docs-category'
    this.keyField = 'id'
    this.sortField = 'id'
    this.confirmField = 'cat_name'
  }

  ngOnInit(): void {
    this.initializeValues()
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  private initializeValues() {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.items$ = this.store.select(categoriesSelector)
    this.dialog$ = this.store.select(dialogActionSelector)
  }

  loadItems(
    event: LazyLoadEvent | null,
    action: number = TCrudAction.NONE
  ): void {
    this.store.dispatch(
      getCategoriesAction({
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
