import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {Table} from 'primeng/table'
import {LazyLoadEvent} from 'primeng/api'

import {environment} from 'src/environments/environment'
import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {getPermissionsAction} from '../../store/actions/permissions.action'

import {
  // countSelector,
  isLoadingSelector,
  permissionsSelector,
  // submittedSelector,
} from '../../store/selectors'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {IItemCRUD} from 'src/app/shared/interfaces/rbac.interface'
import {RbacService} from 'src/app/shared/services/rbac.service'
import {deletePermissionAction} from '../../store/actions/delete.action'
import {IPermissions} from '../../interfaces/permissions.interface'

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
  item: IPermission | null = null

  deleteVisible: boolean = false
  dialogVisible: boolean = false
  isActionRead: boolean = false
  submitted: boolean = false

  isLoading$!: Observable<boolean>
  // item$!: Observable<IPermission | null>
  // items$!: Observable<IPermission[]>
  // itemsCount$!: Observable<number>
  permissions$!: Observable<IPermissions | null>
  // itemDialog$!: Observable<boolean>
  // itemDialogView$!: Observable<boolean>
  // itemDialogDelete$!: Observable<boolean>
  // submitted$!: Observable<boolean>

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
    this.permissions$ = this.store.pipe(select(permissionsSelector))
    // this.itemsCount$ = this.store.pipe(select(countSelector))
    // this.itemDialog$ = this.store.pipe(select(itemDialogSelector))
    // this.itemDialogView$ = this.store.pipe(select(itemDialogViewSelector))
    // this.itemDialogDelete$ = this.store.pipe(select(itemDialogDeleteSelector))
    // this.submitted$ = this.store.pipe(select(submittedSelector))
  }

  loadItems(event: LazyLoadEvent): void {
    this.store.dispatch(getPermissionsAction({event}))
  }

  createItem(): void {
    this.item = {id: 0, code: '', name: '', comment: null, status: 1}
    this.dialogVisible = true
    this.isActionRead = false
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
    this.isActionRead = false
    // this.store.dispatch(updatePermissionAction({item}))
  }

  deleteItem(item: IPermission): void {
    this.item = {...item}
    this.deleteVisible = true
  }

  confirmDelete(id: number): void {
    this.store.dispatch(deletePermissionAction({id}))
    this.item = null
    this.deleteVisible = false

    // this.store.dispatch(deletePermissionConfirmAction())
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
    this.item = null
    this.deleteVisible = false
  }

  hideDialog(): void {
    this.dialogVisible = false
    this.item = null
  }

  saveItem(): void {
    // console.log(this.item)
    // this.store.dispatch(savePermissionAction({item: this.item}))
    this.dialogVisible = false
    this.item = null
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
