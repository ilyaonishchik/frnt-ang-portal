import {Component, OnInit} from '@angular/core'

import {LazyLoadEvent} from 'primeng/api'
import {Table} from 'primeng/table'

import {IColumn} from '../../interfaces/column'
import {IAdminPermission} from './permission'
import {PermissionsService} from './permissions.service'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  timeout: any = null
  loading: boolean = false
  totalRecords: number = 0
  cols: IColumn[] = []
  rowsPerPageOptions = [5, 10, 15, 20]
  submitted: boolean = false
  itemDialog: boolean = false
  itemDialogDelete: boolean = false
  itemDialogView: boolean = false
  items: IAdminPermission[] = []
  item!: IAdminPermission
  clearItem!: IAdminPermission

  constructor(private permissionsService: PermissionsService) {
    this.clearItem = {id: 0, name: null, comment: null, status: 1}
  }

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'Код', width: 'w-1rem'},
      {field: 'name', header: 'Наименование'},
      {field: 'comment', header: 'Описание'},
    ]
    this.loading = true
  }

  loadItems(event: LazyLoadEvent) {
    this.loading = true
    this.permissionsService.getAll(event).subscribe({
      next: (result) => {
        this.items = result.results
        this.totalRecords = result.records
        this.loading = false
      },
    })
  }

  appendItem() {
    this.item = {...this.clearItem}
    this.submitted = false
    this.itemDialog = true
  }

  viewItem(item: IAdminPermission) {
    this.item = {...item}
    this.itemDialog = true
    this.itemDialogView = true
  }

  editItem(item: IAdminPermission) {
    this.item = {...item}
    this.itemDialog = true
  }

  deleteItem(item: IAdminPermission) {
    this.item = {...item}
    this.itemDialogDelete = true
  }

  confirmDelete() {
    this.itemDialogDelete = false
    this.permissionsService.deletePermission(this.item).subscribe({
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
        this.permissionsService.updatePermission(this.item).subscribe({
          next: (res) => {
            this.items[this.findIndexById(res.id)] = res
          },
          error: (err) => {
            console.log(err)
          },
        })
      } else {
        this.permissionsService.createPermission(this.item).subscribe({
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
