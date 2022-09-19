import {Component, OnInit} from '@angular/core'

import {LazyLoadEvent} from 'primeng/api'
import {Table} from 'primeng/table'

import {IColumn} from '../../interfaces/column'
import {IPermission} from './permission'
import {PermissionsService} from './permissions.service'

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  loading: boolean = false
  totalRecords: number = 0
  cols: IColumn[] = []
  items: IPermission[] = []
  timeout: any = null

  constructor(private permissionsService: PermissionsService) {}

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
