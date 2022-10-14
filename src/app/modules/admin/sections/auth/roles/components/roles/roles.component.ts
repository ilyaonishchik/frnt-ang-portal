import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'

import {select, Store} from '@ngrx/store'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {environment} from 'src/environments/environment'
import {IItemCRUD} from 'src/app/shared/interfaces/rbac.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'
import {IRoles} from '../../interfaces/roles.interface'
import {RbacService} from 'src/app/shared/services/rbac.service'
import {isLoadingSelector, rolesSelector} from '../../store/selectors'
import {LazyLoadEvent} from 'primeng/api'
import {getRolesAction} from '../../store/actions/roles.action'
import {Table} from 'primeng/table'
import {IPermission} from '../../../../../../../shared/interfaces/permission.interface'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  timeout: any = null
  columns: IColumn[] = []
  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions
  userCRUD!: IItemCRUD
  item: IRole | null = null

  deleteVisible: boolean = false
  dialogVisible: boolean = false
  // isActionRead: boolean = false
  submitted: boolean = false

  isLoading$!: Observable<boolean>
  roles$!: Observable<IRoles | null>

  constructor(private store: Store, private rbacService: RbacService) {}

  ngOnInit(): void {
    this.userCRUD = this.rbacService.getItemCRUD('role')
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

  readItem(itemId: number): void {
    // console.log(itemId)
    // this.item = item
    // this.dialogVisible = true
    // this.actionRead = true
    // this.store.dispatch(readPermissionAction({item}))
  }

  updateItem(item: IPermission): void {
    // this.item = {...item}
    // this.dialogVisible = true
    // this.isActionRead = false
    // this.store.dispatch(updatePermissionAction({item}))
  }

  deleteItem(item: IPermission): void {
    // this.item = {...item}
    // this.deleteVisible = true
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
