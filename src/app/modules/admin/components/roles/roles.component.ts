import {Component, OnInit} from '@angular/core'

import {LazyLoadEvent} from 'primeng/api'
import {Table} from 'primeng/table'

import {IColumn} from '../../interfaces/column'
import {IRole} from './role'
import {IPermission} from '../permissions/permission'
import {RolesService} from './roles.service'

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
  item: IRole = {}

  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'Код', width: 'w-1rem'},
      {field: 'name', header: 'Наименование'},
      {field: 'comment', header: 'Описание'},
    ]
    this.loading = true
  }

  loadRoles(event?: LazyLoadEvent) {
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
    this.item = {}
    this.submitted = false
    this.itemDialog = true
  }

  viewItem(item: IPermission) {
    this.item = {...item}
    this.itemDialog = true
    this.itemDialogView = true
  }

  editItem(item: IPermission) {
    this.item = {...item}
    this.itemDialog = true
  }

  deleteItem(item: IPermission) {
    this.item = {...item}
    this.itemDialogDelete = true
  }

  confirmDelete() {
    this.itemDialogDelete = false

    this.item = {}
  }

  hideDialog() {
    this.itemDialog = false
    this.itemDialogView = false
    this.submitted = false
  }

  saveItem() {
    this.submitted = true
    if (this.item.name?.trim()) {
      if (this.item.id) {
      } else {
      }
      // this.items = [...this.items]
      this.itemDialog = false
      this.item = {}
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
}
