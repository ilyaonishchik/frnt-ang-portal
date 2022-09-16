import {Component, OnInit} from '@angular/core'
import {RolesService} from './roles.service'
import {IColumn} from '../../interfaces/column'
import {LazyLoadEvent} from 'primeng/api'
import {IRole} from './role'
import {Table} from 'primeng/table'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  loading: boolean = false
  totalRecords: number = 0
  cols: IColumn[] = []
  roles: IRole[] = []

  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.cols = [
      {field: 'id', header: 'Код'},
      {field: 'name', header: 'Наименование'},
      {field: 'comment', header: 'Описание'},
    ]
    this.loading = true
  }

  loadRoles(event?: LazyLoadEvent) {
    this.loading = true
    this.rolesService.getAll(event).subscribe({
      next: (result) => {
        this.roles = result.results
        this.totalRecords = result.records
        this.loading = false
      },
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
}
