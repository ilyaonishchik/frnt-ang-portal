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

import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IColumn} from '@shared/interfaces/column.interface'
import {environment} from 'environments/environment'
import {IItemCRUD} from '@shared/interfaces/rbac.interface'
import {RbacService} from '@shared/services/rbac.service'
import {IDeleteEvent} from '@shared/interfaces/event.interface'
import {ToastService} from '@shared/services/toast.service'

@Component({
  selector: 'avs-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  notPermission = 'У Вас нет прав для выполнения данной операции.'
  rowsPerPageCount: number = environment.rowsPerPageCount
  rowsPerPageOptions: number[] = environment.rowsPerPageOptions

  crud!: IItemCRUD
  filterValue: string | null = null

  @ViewChild('dt') table!: Table

  @Input() data: ITableItems<any> = {items: [], count: 0, first: 0}
  @Input() columns: IColumn[] = []
  @Input() loading = false
  @Input() loadingOnInit = false
  @Input() crudName: string | null = null
  @Input() filterFields: string[] = []
  @Input() sortField = 'id'
  @Input() keyField = 'id'
  @Input() confirmField = 'id'

  @Output() lazyLoad = new EventEmitter<LazyLoadEvent>()
  @Output() actionCreate = new EventEmitter()
  @Output() actionRead = new EventEmitter<number>()
  @Output() actionUpdate = new EventEmitter<number>()
  @Output() actionDelete = new EventEmitter<IDeleteEvent>()

  constructor(
    private rbacService: RbacService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.crud = this.rbacService.getItemCRUD(this.crudName)
  }

  loadItems(event: LazyLoadEvent): void {
    this.lazyLoad.emit(event)
  }

  createItem(): void {
    if (this.crud.create) {
      this.actionCreate.emit()
    } else {
      this.toastService.showWarn(this.notPermission)
    }
  }

  readItem(id: number): void {
    if (this.crud.read) {
      this.actionRead.emit(id)
    } else {
      this.toastService.showWarn(this.notPermission)
    }
  }

  updateItem(id: number): void {
    if (this.crud.update) {
      this.actionUpdate.emit(id)
    } else {
      this.toastService.showWarn(this.notPermission)
    }
  }

  deleteItem(event: any): void {
    if (this.crud.delete) {
      const deleteEvent: IDeleteEvent = {
        id: event[this.keyField],
        confirm: event[this.confirmField],
      }
      this.actionDelete.emit(deleteEvent)
    } else {
      this.toastService.showWarn(this.notPermission)
    }
  }

  onGlobalFilter(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value
    this.table.filters = {}
    if (this.filterValue) {
      for (const field in this.table.globalFilterFields) {
        this.table.filter(
          this.filterValue,
          this.table.globalFilterFields[field],
          'contains'
        )
      }
      if (!this.table.hasFilter()) {
        this.table.filter(this.filterValue, '_', 'contains')
      }
    } else {
      this.refreshItems()
    }
  }

  clearSearch(): void {
    this.filterValue = null
    this.table.filters = {}
    this.table.clear()
  }

  refreshItems(): void {
    this.table._filter()
  }
}
