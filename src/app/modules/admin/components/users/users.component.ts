import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'

import {Table} from 'primeng/table'
import {LazyLoadEvent} from 'primeng/api'

import {UsersService} from './users.service'
import {IUser} from './user'
import {IColumn} from '../../interfaces/column'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  loading: boolean = false
  totalRecords: number = 0
  users: IUser[] = []
  cols: IColumn[] = []
  timeout: any = null

  @ViewChild('filter') filter!: ElementRef

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'Код', width: 'w-1rem'},
      {field: 'username', header: 'Пользователь'},
      {field: 'email', header: 'Email'},
      // {field: 'desc', header: 'Описание'},
    ]
    this.loading = true
  }

  loadUsers(event: LazyLoadEvent) {
    this.loading = true
    this.usersService.getAll(event).subscribe({
      next: (result) => {
        this.users = result.results
        this.totalRecords = result.records
        this.loading = false
      },
    })
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
