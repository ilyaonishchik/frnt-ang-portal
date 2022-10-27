import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import {LazyLoadEvent} from 'primeng/api'
import {Table} from 'primeng/table'

import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {environment} from 'src/environments/environment'
import {IItemCRUD} from 'src/app/shared/interfaces/rbac.interface'
import {RbacService} from 'src/app/shared/services/rbac.service'
import {IDeleteEvent} from 'src/app/shared/interfaces/event.interface'

@Component({
  selector: 'avs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions

  userCRUD!: IItemCRUD
  filterValue: string | null = null

  @ViewChild('dt') table!: Table

  @Input('data') data: ITableItems<any> = {items: [], count: 0, first: 0}
  @Input('columns') columns: IColumn[] = []
  @Input('loading') loading: boolean = false
  @Input('loadingOnInit') loadingOnInit: boolean = false
  @Input('crudName') crudName: string | null = null
  @Input('filterFields') filterFields: string[] = []
  @Input('sortField') sortField: string = 'id'
  @Input('keyField') keyField: string = 'id'
  @Input('confirmField') confirmField: string = 'id'

  @Output('onLazyLoad') onLazyLoad = new EventEmitter<LazyLoadEvent>()
  @Output('actionCreate') onCreate = new EventEmitter<any>()
  @Output('actionRead') onRead = new EventEmitter<number>()
  @Output('actionUpdate') onUpdate = new EventEmitter<number>()
  @Output('actionDelete') onDelete = new EventEmitter<IDeleteEvent>()

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
    const deleteEvent: IDeleteEvent = {
      id: event[this.keyField],
      confirm: event[this.confirmField],
    }
    this.onDelete.emit(deleteEvent)
  }

  onGlobalFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value
    this.table.filterGlobal(this.filterValue, 'contains')
  }

  clearSearch(): void {
    this.filterValue = null
    this.table.filterGlobal(this.filterValue, null)
  }

  refreshItems(): void {
    this.table.filterDelay = 0
    this.table.filterGlobal(this.filterValue, 'contains')
    this.table.filterDelay = 1000
  }
}
