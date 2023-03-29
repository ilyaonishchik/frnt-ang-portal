import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable} from 'rxjs'

import {Store} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from '@shared/interfaces/column.interface'
import {
  dialogActionSelector,
  isLoadingSelector,
  rolesSelector,
} from '../../store/selectors'
import {
  clearRolesStateAction,
  getRolesAction,
} from '../../store/actions/roles.action'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {IRole} from '@shared/interfaces/role.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {TCrudAction} from '@shared/types/crud-action.type'
import {
  dialogCancelAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {IDeleteEvent} from '@shared/interfaces/event.interface'
import {
  clearPermissionsAction,
  getAllPermissionsAction,
} from '@shared/store/actions/session.actions'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit, OnDestroy {
  isLoading$!: Observable<boolean>
  items$!: Observable<ITableItems<IRole> | null>
  dialog$!: Observable<ICrudAction | null>

  subjectName = 'роли'
  columns!: IColumn[]
  crudName = 'admin:role'
  keyField = 'id'
  sortField = 'id'
  confirmField = 'code'

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeParams()
    this.initializeSubscriptions()
    this.initializeValues()
  }

  private initializeParams(): void {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'code', header: 'Код'},
      {field: 'name', header: 'Наименование'},
    ]
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.items$ = this.store.select(rolesSelector)
    this.dialog$ = this.store.select(dialogActionSelector)
  }

  private initializeValues(): void {
    this.store.dispatch(getAllPermissionsAction())
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  loadItems(
    event: LazyLoadEvent | null,
    action: number = TCrudAction.NONE
  ): void {
    this.store.dispatch(getRolesAction({event: event, action: action}))
  }

  createItem(): void {
    this.store.dispatch(
      dialogShowAction({crud: {id: null, action: TCrudAction.CREATE}})
    )
  }

  readItem(id: number): void {
    this.store.dispatch(
      dialogShowAction({crud: {id: id, action: TCrudAction.READ}})
    )
  }

  updateItem(id: number): void {
    this.store.dispatch(
      dialogShowAction({crud: {id: id, action: TCrudAction.UPDATE}})
    )
  }

  deleteItem(event: IDeleteEvent): void {
    this.store.dispatch(
      dialogShowAction({
        crud: {
          id: event.id,
          action: TCrudAction.DELETE,
          confirm: event.confirm,
        },
      })
    )
  }

  hideDialog(): void {
    this.store.dispatch(dialogCancelAction())
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearPermissionsAction())
    this.store.dispatch(clearRolesStateAction())
  }
}
