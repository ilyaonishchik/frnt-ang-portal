import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'

import {Table} from 'primeng/table'
import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from '../../interfaces/column'
import {IUser} from '../../interfaces/user'
import {UsersService} from './users.service'

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
  item: IUser = {}

  @ViewChild('filter') filter!: ElementRef

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'Код', width: 'w-1rem'},
      {field: 'username', header: 'Пользователь'},
      {field: 'email', header: 'Email'},
      {field: 'comment', header: 'Описание'},
    ]
    this.loading = true
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
    this.item = {}
    this.submitted = false
    this.itemDialog = true
  }

  viewItem(item: IUser) {
    this.item = {...item}
    this.itemDialog = true
    this.itemDialogView = true
  }

  editItem(item: IUser) {
    this.item = {...item}
    this.itemDialog = true
  }

  deleteItem(item: IUser) {
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
    if (this.item.username?.trim()) {
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
