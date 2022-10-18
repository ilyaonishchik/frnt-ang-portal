import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'

import {select, Store} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {IRoles} from '../../interfaces/roles.interface'
import {isLoadingSelector, rolesSelector} from '../../store/selectors'
import {getRolesAction} from '../../store/actions/roles.action'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  columns: IColumn[]
  crudName: string

  isLoading$!: Observable<boolean>
  roles$!: Observable<IRoles | null>

  dialogVisible: boolean = false
  isReadOnly: boolean = false

  // item: IRole | null = null

  // deleteVisible: boolean = false
  // dialogVisible: boolean = false
  // isActionRead: boolean = false
  // submitted: boolean = false

  constructor(private store: Store) {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'code', header: 'Код'},
      {field: 'name', header: 'Наименование'},
    ]
    this.crudName = 'role'
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.roles$ = this.store.pipe(select(rolesSelector))
  }

  loadItems(event: LazyLoadEvent): void {
    this.store.dispatch(getRolesAction({event}))
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
    // this.dialogVisible = true
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

  confirmDelete(id: number): void {
    // this.store.dispatch(deletePermissionAction({id}))
    // this.item = null
    // this.deleteVisible = false
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
    // this.item = null
    // this.deleteVisible = false
  }
}
