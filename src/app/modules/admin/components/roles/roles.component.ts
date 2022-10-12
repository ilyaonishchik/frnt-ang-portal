import {Component, OnInit} from '@angular/core'

import {LazyLoadEvent} from 'primeng/api'
import {Table} from 'primeng/table'

import {RolesService} from './roles.service'
import {RbacService} from 'src/app/shared/services/rbac.service'
import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'
import {IItemCRUD} from 'src/app/shared/interfaces/rbac.interface'
import {IPermission} from 'src/app/shared/interfaces/permission.interface'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  timeout: any = null
  loading: boolean = false
  totalRecords: number = 0
  cols: IColumn[] = []
  rowsPerPageOptions = [5, 10, 15, 20]
  submitted: boolean = false
  itemDialog: boolean = false
  itemDialogDelete: boolean = false
  itemDialogView: boolean = false
  items: IRole[] = []
  item!: IRole
  clearItem!: IRole

  userCRUD!: IItemCRUD

  allPermissions: IPermission[] = []
  sourcePermissions: IPermission[] = []

  constructor(
    private rolesService: RolesService,
    private rbacService: RbacService
  ) {
    this.clearItem = {
      id: 0,
      code: '',
      name: '',
      comment: null,
      status: 1,
      permissions: [],
    }
  }

  ngOnInit(): void {
    this.userCRUD = this.rbacService.getItemCRUD('role')
    this.cols = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'code', header: 'Код'},
      {field: 'name', header: 'Наименование'},
      {field: 'comment', header: 'Описание'},
    ]
    this.loading = true

    this.rolesService.getPermissions().subscribe({
      next: (value) => {
        this.allPermissions = value
      },
    })
  }

  loadItems(event: LazyLoadEvent) {
    this.loading = true
    this.rolesService.getAll(event).subscribe({
      next: (result) => {
        this.items = result.results
        this.totalRecords = result.records
        this.loading = false
      },
    })
  }

  appendItem() {
    this.item = {...this.clearItem}
    this.sourcePermissions = this.allPermissions
    this.submitted = false
    this.itemDialog = true
  }

  viewItem(item: IRole) {
    this.item = {...item}
    this.sourcePermissions = []
    this.rolesService.getRole(item).subscribe({
      next: (result) => {
        this.item.permissions = result.permissions
      },
    })
    this.itemDialog = true
    this.itemDialogView = true
  }

  editItem(item: IRole) {
    this.item = {...item}
    this.sourcePermissions = []
    this.rolesService.getRole(item).subscribe({
      next: (result) => {
        this.item.permissions = result.permissions
        this.sourcePermissions = this.allPermissions.filter(
          (i) => result.permissions.findIndex((e) => e.id === i.id) < 0
        )
      },
    })
    this.itemDialog = true
  }

  deleteItem(item: IRole) {
    this.item = {...item}
    this.itemDialogDelete = true
  }

  confirmDelete() {
    this.itemDialogDelete = false
    this.rolesService.deleteRole(this.item).subscribe({
      next: (res) => {
        this.items = this.items.filter((val) => val.id !== res.record_id)
      },
      error: (err) => {
        console.log(err)
      },
    })
    this.item = {...this.clearItem}
  }

  hideDialog() {
    this.itemDialog = false
    this.itemDialogView = false
    this.submitted = false
  }

  saveItem() {
    this.submitted = true
    if (this.item.name?.trim()) {
      if (this.item.id > 0) {
        this.rolesService.updateRole(this.item).subscribe({
          next: (res) => {
            this.items[this.findIndexById(res.id)] = res
          },
          error: (err) => {
            console.log(err)
          },
        })
      } else {
        this.rolesService.createRole(this.item).subscribe({
          next: (res) => {
            this.items.push(res)
          },
          error: (err) => {
            console.log(err)
          },
        })
      }
      this.items = [...this.items]
      this.itemDialog = false
      this.item = {...this.clearItem}
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(function () {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
    }, 500)
  }

  clearSearch(table: Table) {
    table.filterGlobal(null, 'contains')
  }

  findIndexById(id: number): number {
    let index = -1
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        index = i
        break
      }
    }
    return index
  }
}
