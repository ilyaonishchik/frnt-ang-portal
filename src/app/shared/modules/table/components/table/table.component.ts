import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {LazyLoadEvent} from 'primeng/api'
import {Table} from 'primeng/table'

import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {environment} from 'src/environments/environment'
import {IItemCRUD} from 'src/app/shared/interfaces/rbac.interface'
import {RbacService} from 'src/app/shared/services/rbac.service'

@Component({
  selector: 'avs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  timeout: any = null
  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions
  userCRUD!: IItemCRUD

  @Input('data') data: ITableItems<any> = {items: [], count: 0}
  @Input('columns') columns: IColumn[] = []
  @Input('loading') loading: boolean = false
  @Input('crudName') crudName: string | null = null
  @Input('filterFields') filterFields: string[] = []
  @Input('sortField') sortField: string = 'id'
  @Input('keyField') keyField: string = 'id'

  @Output('onLazyLoad') onLazyLoad: EventEmitter<LazyLoadEvent> =
    new EventEmitter<LazyLoadEvent>()

  constructor(private rbacService: RbacService) {}

  ngOnInit(): void {
    this.userCRUD = this.rbacService.getItemCRUD(this.crudName)
  }

  loadItems(event: LazyLoadEvent): void {
    this.onLazyLoad.emit(event)
  }

  createItem(): void {}

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
