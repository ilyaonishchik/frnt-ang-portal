import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {getPermissionsAction} from '../../store/actions/permissions.action'

import {
  dialogActionSelector,
  isLoadingSelector,
  permissionsSelector,
  tableStateSelector,
} from '../../store/selectors'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {
  dialogCancelAction,
  dialogShowAction,
} from '../../store/actions/dialogs.action'
import {ICrudAction} from 'src/app/shared/interfaces/crud-action.interface'
import {IDeleteEvent} from 'src/app/shared/interfaces/event.interface'
import {TCrudAction} from 'src/app/shared/types/crud-action.type'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  columns: IColumn[]
  crudName: string
  keyField: string
  sortField: string
  confirmField: string

  isLoading$!: Observable<boolean>
  permissions$!: Observable<ITableItems<IPermission> | null>
  dialog$!: Observable<ICrudAction | null>
  tableState$!: Observable<LazyLoadEvent | null>

  constructor(private store: Store) {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'code', header: 'Код'},
      {field: 'name', header: 'Наименование'},
    ]
    this.crudName = 'permission'
    this.keyField = 'id'
    this.sortField = 'id'
    this.confirmField = 'code'
  }

  ngOnInit(): void {
    this.initializeValues()
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.permissions$ = this.store.pipe(select(permissionsSelector))
    this.dialog$ = this.store.pipe(select(dialogActionSelector))
    this.tableState$ = this.store.pipe(select(tableStateSelector))
  }

  loadItems(event: LazyLoadEvent | null, action?: number): void {
    this.store.dispatch(
      getPermissionsAction({
        event: event,
        action: action ? action : TCrudAction.NONE,
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

  confirmDelete(id: number): void {
    // this.store.dispatch(deletePermissionAction({id: id}))
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
    // this.idItem = 0
    // this.dialogVisible = false
    // this.dialogAction = 0
  }

  // cancelDelete(): void {
  //   this.item = null
  //   this.deleteVisible = false
  // }

  hideDialog(): void {
    this.store.dispatch(dialogCancelAction())
  }

  saveItem(): void {
    // console.log(this.item)
    // this.store.dispatch(savePermissionAction({item: this.item}))
    // this.dialogVisible = false
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
