import {Component, OnDestroy, OnInit} from '@angular/core'
import {IColumn} from '@shared/interfaces/column.interface'
import {Observable} from 'rxjs'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {Store} from '@ngrx/store'
import {TCrudAction} from '@shared/types/crud-action.type'
import {
  dialogCancelAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {IDeleteEvent} from '@shared/interfaces/event.interface'
import {
  dialogActionSelector,
  filesSelector,
  isLoadingSelector,
} from '@modules/admin/sections/docs/files/store/selectors'
import {LazyLoadEvent} from 'primeng/api'
import {
  clearFilesStateAction,
  getFilesAction,
} from '@modules/admin/sections/docs/files/store/actions/files.action'

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
})
export class FilesComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>
  items$!: Observable<ITableItems<IFile> | null>
  dialog$!: Observable<ICrudAction | null>

  subjectName = 'файла'
  columns!: IColumn[]
  crudName = 'admin:docs-file'
  keyField = 'id'
  sortField = 'id'
  confirmField = 'file_name'

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
    this.fetchData()
  }

  private initializeValues() {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'file_type', header: 'Тип', width: 'w-1rem', pipe: 'mimeicon'},
      {field: 'file_name', header: 'Наименование'},
      {field: 'file_desc', header: 'Описание'},
      {field: 'file_size', header: 'Размер', width: 'w-1rem', pipe: 'filesize'},
      {field: 'downloads', header: 'Скачано', width: 'w-1rem'},
    ]
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.items$ = this.store.select(filesSelector)
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
      getFilesAction({
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
    this.store.dispatch(clearFilesStateAction())
  }
}
