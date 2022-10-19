import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {getPermissionsAction} from '../../store/actions/permissions.action'

import {isLoadingSelector, permissionsSelector} from '../../store/selectors'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  columns: IColumn[]
  crudName: string

  isLoading$!: Observable<boolean>
  permissions$!: Observable<ITableItems<IPermission> | null>

  dialogVisible: boolean = false
  isReadOnly: boolean = false

  // item: IPermission | null = null

  // deleteVisible: boolean = false
  // dialogVisible: boolean = false
  // isActionRead: boolean = false
  // submitted: boolean = false

  // item$!: Observable<IPermission | null>
  // items$!: Observable<IPermission[]>
  // itemsCount$!: Observable<number>
  // itemDialog$!: Observable<boolean>
  // itemDialogView$!: Observable<boolean>
  // itemDialogDelete$!: Observable<boolean>
  // submitted$!: Observable<boolean>

  constructor(private store: Store) {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'code', header: 'Код'},
      {field: 'name', header: 'Наименование'},
    ]
    this.crudName = 'permission'
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.permissions$ = this.store.pipe(select(permissionsSelector))
  }

  loadItems(event: LazyLoadEvent): void {
    this.store.dispatch(getPermissionsAction({event}))
  }

  createItem(): void {
    // this.item = {id: 0, code: '', name: '', comment: null, status: 1}
    // this.dialogVisible = true
    // this.isActionRead = false
    // this.store.dispatch(createPermissionAction())
    // this.item = {...this.clearItem}
    // this.submitted = false
    // this.itemDialog = true
  }

  readItem(event: any): void {
    console.log(event)
    // this.item = item
    this.dialogVisible = true
    // this.actionRead = true
    // this.store.dispatch(readPermissionAction({item}))
  }

  updateItem(event: any): void {
    console.log(event)
    // this.item = {...item}
    // this.dialogVisible = true
    // this.isActionRead = false
    // this.store.dispatch(updatePermissionAction({item}))
  }

  deleteItem(event: any): void {
    console.log(event)
    // this.item = {...item}
    // this.deleteVisible = true
  }

  // confirmDelete(id: number): void {
  //   this.store.dispatch(deletePermissionAction({id}))
  //   this.item = null
  //   this.deleteVisible = false

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
  // }

  // cancelDelete(): void {
  //   this.item = null
  //   this.deleteVisible = false
  // }

  hideDialog(): void {
    this.dialogVisible = false
    // this.item = null
  }

  saveItem(): void {
    // console.log(this.item)
    // this.store.dispatch(savePermissionAction({item: this.item}))
    this.dialogVisible = false
    // this.item = null
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
}
