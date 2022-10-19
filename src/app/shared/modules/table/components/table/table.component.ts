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
  @Input('confirmField') confirmField: string = 'id'

  @Output('onLazyLoad') onLazyLoad: EventEmitter<LazyLoadEvent> =
    new EventEmitter<LazyLoadEvent>()

  @Output('actionCreate') onCreate: EventEmitter<any> = new EventEmitter<any>()
  @Output('actionRead') onRead: EventEmitter<number> =
    new EventEmitter<number>()
  @Output('actionUpdate') onUpdate: EventEmitter<number> =
    new EventEmitter<number>()
  @Output('actionDelete') onDelete: EventEmitter<any> = new EventEmitter<any>()

  constructor(private rbacService: RbacService) {}

  ngOnInit(): void {
    this.userCRUD = this.rbacService.getItemCRUD(this.crudName)
  }

  loadItems(event: LazyLoadEvent): void {
    this.onLazyLoad.emit(event)
  }

  createItem(): void {
    this.onCreate.emit()
  }

  readItem(id: number): void {
    this.onRead.emit(id)
  }

  updateItem(id: number): void {
    this.onUpdate.emit(id)
  }

  deleteItem(event: any): void {
    this.onDelete.emit(event[this.confirmField])
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  clearSearch(table: Table) {
    table.filterGlobal(null, 'contains')
  }
}
