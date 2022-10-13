import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {Table} from 'primeng/table'
import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {
  createPermissionAction,
  deletePermissionAction,
  deletePermissionCancelAction,
  deletePermissionConfirmAction,
  getPermissionsAction,
  hidePermissionDialogAction,
  readPermissionAction,
  savePermissionAction,
  updatePermissionAction,
} from '../../store/actions/permissions.action'

import {
  countSelector,
  isLoadingSelector,
  itemDialogDeleteSelector,
  itemDialogSelector,
  itemDialogViewSelector,
  permissionsSelector,
  submittedSelector,
} from '../../store/selectors'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {IItemCRUD} from 'src/app/shared/interfaces/rbac.interface'
import {RbacService} from 'src/app/shared/services/rbac.service'

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
  userCRUD!: IItemCRUD
  item!: IPermission

  deleteVisible: boolean = false
  dialogVisible: boolean = false
  actionRead: boolean = false
  submitted: boolean = false

  isLoading$!: Observable<boolean>
  // item$!: Observable<IPermission | null>
  items$!: Observable<IPermission[]>
  itemsCount$!: Observable<number>
  // itemDialog$!: Observable<boolean>
  // itemDialogView$!: Observable<boolean>
  // itemDialogDelete$!: Observable<boolean>
  submitted$!: Observable<boolean>

  constructor(private store: Store, private rbacService: RbacService) {}

  ngOnInit(): void {
    this.userCRUD = this.rbacService.getItemCRUD('permission')
    this.setColumns()
    this.initializeValues()
  }

  setColumns(): void {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'code', header: 'Код'},
      {field: 'name', header: 'Наименование'},
    ]
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    // this.item$ = this.store.pipe(select(itemSelector))
    this.items$ = this.store.pipe(select(permissionsSelector))
    this.itemsCount$ = this.store.pipe(select(countSelector))
    // this.itemDialog$ = this.store.pipe(select(itemDialogSelector))
    // this.itemDialogView$ = this.store.pipe(select(itemDialogViewSelector))
    // this.itemDialogDelete$ = this.store.pipe(select(itemDialogDeleteSelector))
    this.submitted$ = this.store.pipe(select(submittedSelector))
  }

  loadItems(event: LazyLoadEvent): void {
    this.store.dispatch(getPermissionsAction({event}))
  }

  createItem(): void {
    this.item = {id: 0, code: '', name: '', comment: null, status: 1}
    this.dialogVisible = true
    this.actionRead = false
    // this.store.dispatch(createPermissionAction())
    // this.item = {...this.clearItem}
    // this.submitted = false
    // this.itemDialog = true
  }

  readItem(itemId: number): void {
    console.log(itemId)
    // this.item = item
    // this.dialogVisible = true
    // this.actionRead = true
    // this.store.dispatch(readPermissionAction({item}))
  }

  updateItem(item: IPermission): void {
    this.item = {...item}
    this.dialogVisible = true
    this.actionRead = false
    // this.store.dispatch(updatePermissionAction({item}))
  }

  deleteItem(item: IPermission): void {
    this.item = item
    this.store.dispatch(deletePermissionAction({item}))
    // this.item = {...item}
    this.deleteVisible = true
  }

  confirmDelete(): void {
    // this.store.dispatch(deletePermissionConfirmAction())
    this.deleteVisible = false
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

  cancelDelete(): void {
    this.deleteVisible = false
    // this.store.dispatch(deletePermissionCancelAction())
  }

  hideDialog(): void {
    // this.store.dispatch(hidePermissionDialogAction())
    this.dialogVisible = false
  }

  saveItem(): void {
    // console.log(this.item)
    // this.store.dispatch(savePermissionAction({item: this.item}))
    this.dialogVisible = false
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
