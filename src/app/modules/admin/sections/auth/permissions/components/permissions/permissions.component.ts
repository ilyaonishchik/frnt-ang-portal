import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {Table} from 'primeng/table'
import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {IColumn} from 'src/app/shared/types/column.interface'
import {getPermissionsAction} from '../../store/actions/permissions.action'

import {
  countSelector,
  isLoadingSelector,
  permissionsSelector,
} from '../../store/selectors'
import {IPermission} from 'src/app/shared/types/permission.interface'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  timeout: any = null
  columns: IColumn[] = []
  rowsPerPageCount!: number
  rowsPerPageOptions!: number[]

  isLoading$!: Observable<boolean>
  items$!: Observable<IPermission[]>
  itemsCount$!: Observable<number>

  constructor(private store: Store) {
    this.rowsPerPageCount = environment.rowsPerPageCount
    this.rowsPerPageOptions = environment.rowsPerPageOptions
  }

  ngOnInit(): void {
    this.setColumns()
    this.initializeValues()
  }

  setColumns(): void {
    this.columns = [
      {field: 'id', header: 'Код', width: 'w-1rem'},
      {field: 'name', header: 'Наименование'},
      {field: 'comment', header: 'Описание'},
    ]
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.items$ = this.store.pipe(select(permissionsSelector))
    this.itemsCount$ = this.store.pipe(select(countSelector))
  }

  loadItems(event: LazyLoadEvent) {
    this.store.dispatch(getPermissionsAction({event}))
  }

  onGlobalFilter(table: Table, event: Event) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(function () {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }, 1000)
  }

  clearSearch(table: Table) {
    table.filterGlobal(null, 'contains')
  }
}
