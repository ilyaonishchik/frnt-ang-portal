import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'

import {Table} from 'primeng/table'
import {LazyLoadEvent} from 'primeng/api'

import {UsersService} from './users.service'
import {IUser} from '../../../../shared/types/user.interface'
import {IPermission} from '../../../../shared/interfaces/permission.interface'
import {IRole} from '../../../../shared/interfaces/role.interface'
import {IItemCRUD} from '../../../../shared/interfaces/rbac.interface'
import {RbacService} from '../../../../shared/services/rbac.service'
import {IColumn} from '../../../../shared/interfaces/column.interface'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  timeout: any = null
  loading: boolean = false
  totalRecords: number = 0
  cols: IColumn[] = []
  rowsPerPageOptions = [5, 10, 15, 20]
  submitted: boolean = false
  itemDialog: boolean = false
  itemDialogDelete: boolean = false
  itemDialogView: boolean = false
  items: IUser[] = []
  item!: IUser
  clearItem!: IUser
  userCRUD!: IItemCRUD

  allRoles: IRole[] = []
  allPermissions: IPermission[] = []
  sourceRoles: IRole[] = []
  sourcePermissions: IPermission[] = []

  @ViewChild('filter') filter!: ElementRef

  constructor(
    private usersService: UsersService,
    private rbacService: RbacService
  ) {
    this.clearItem = {
      id: 0,
      username: '',
      email: '',
      comment: null,
      avatar: null,
      status: 1,
      roles: [],
      permissions: [],
    }
  }

  ngOnInit(): void {
    this.userCRUD = this.rbacService.getItemCRUD('permissions')
    this.cols = [
      {field: 'id', header: 'Код', width: 'w-1rem'},
      {field: 'username', header: 'Пользователь'},
      {field: 'email', header: 'Email'},
      {field: 'comment', header: 'Описание'},
    ]
    this.loading = true

    this.usersService.getRoles().subscribe({
      next: (value) => {
        this.allRoles = value
      },
    })
    this.usersService.getPermissions().subscribe({
      next: (value) => {
        this.allPermissions = value
      },
    })
  }

  loadItems(event: LazyLoadEvent) {
    this.loading = true
    this.usersService.getAll(event).subscribe({
      next: (result) => {
        this.items = result.results
        this.totalRecords = result.records
        this.loading = false
      },
    })
  }

  appendItem() {
    this.item = {...this.clearItem}
    this.sourceRoles = this.allRoles
    this.sourcePermissions = this.allPermissions
    this.submitted = false
    this.itemDialog = true
  }

  viewItem(item: IUser) {
    this.item = {...item}
    this.sourceRoles = []
    this.sourcePermissions = []
    this.usersService.getUser(item).subscribe({
      next: (result) => {
        this.item.roles = result.roles
        this.item.permissions = result.permissions
      },
    })
    this.itemDialog = true
    this.itemDialogView = true
  }

  editItem(item: IUser) {
    this.item = {...item}
    this.sourceRoles = []
    this.sourcePermissions = []
    this.usersService.getUser(item).subscribe({
      next: (result) => {
        this.item.roles = result.roles
        this.item.permissions = result.permissions
        this.sourceRoles = this.allRoles.filter(
          (i) => result.roles.findIndex((e) => e.id === i.id) < 0
        )
        this.sourcePermissions = this.allPermissions.filter(
          (i) => result.permissions.findIndex((e) => e.id === i.id) < 0
        )
      },
    })
    this.itemDialog = true
  }

  deleteItem(item: IUser) {
    this.item = {...item}
    this.itemDialogDelete = true
  }

  confirmDelete() {
    this.itemDialogDelete = false
    this.usersService.deleteUser(this.item).subscribe({
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
    if (this.item.username?.trim()) {
      if (this.item.id) {
        this.usersService.updateUser(this.item).subscribe({
          next: (res) => {
            this.items[this.findIndexById(res.id)] = res
          },
          error: (err) => {
            console.log(err)
          },
        })
      } else {
        this.usersService.createUser(this.item).subscribe({
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
