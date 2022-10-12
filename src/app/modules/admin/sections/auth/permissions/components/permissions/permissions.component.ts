import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {Table} from 'primeng/table'
import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {
  getPermissionsAction,
  readPermissionAction,
} from '../../store/actions/permissions.action'

import {
  countSelector,
  isLoadingSelector,
  itemDialogSelector,
  itemSelector,
  permissionsSelector,
} from '../../store/selectors'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  timeout: any = null
  columns: IColumn[] = []
  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions

  isLoading$!: Observable<boolean>
  item$!: Observable<IPermission | null>
  items$!: Observable<IPermission[]>
  itemsCount$!: Observable<number>
  itemDialog$!: Observable<boolean>
  itemDialogView$!: Observable<boolean>
  itemDialogDelete$!: Observable<boolean>
  submitted$!: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.setColumns()
    this.initializeValues()
  }

  setColumns(): void {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'code', header: 'Код'},
      {field: 'name', header: 'Наименование'},
      {field: 'comment', header: 'Описание'},
    ]
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.item$ = this.store.pipe(select(itemSelector))
    this.items$ = this.store.pipe(select(permissionsSelector))
    this.itemsCount$ = this.store.pipe(select(countSelector))
    this.itemDialog$ = this.store.pipe(select(itemDialogSelector))
  }

  loadItems(event: LazyLoadEvent): void {
    this.store.dispatch(getPermissionsAction({event}))
  }

  createItem(): void {
    // this.item = {...this.clearItem}
    // this.submitted = false
    // this.itemDialog = true
  }

  readItem(item: IPermission): void {
    this.store.dispatch(readPermissionAction({item}))
  }

  updateItem(item: IPermission): void {
    // this.item = {...item}
    // this.itemDialog = true
  }

  deleteItem(item: IPermission): void {
    // this.item = {...item}
    // this.itemDialogDelete = true
  }

  confirmDelete(): void {
    // this.itemDialogDelete = false
    // this.permissionsService.deletePermission(this.item).subscribe({
    //   next: (res) => {
    //     this.items = this.items.filter((val) => val.id !== res.record_id)
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   },
    // })
    // this.item = {...this.clearItem}
  }

  cancelDelete(): void {}

  hideDialog(): void {
    // this.itemDialog = false
    // this.itemDialogView = false
    // this.submitted = false
  }

  saveItem(): void {
    // this.submitted = true
    // if (this.item.name?.trim()) {
    //   if (this.item.id > 0) {
    //     this.permissionsService.updatePermission(this.item).subscribe({
    //       next: (res) => {
    //         this.items[this.findIndexById(res.id)] = res
    //       },
    //       error: (err) => {
    //         console.log(err)
    //       },
    //     })
    //   } else {
    //     this.permissionsService.createPermission(this.item).subscribe({
    //       next: (res) => {
    //         this.items.push(res)
    //       },
    //       error: (err) => {
    //         console.log(err)
    //       },
    //     })
    //   }
    //   this.items = [...this.items]
    //   this.itemDialog = false
    //   this.item = {...this.clearItem}
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
