import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from '@shared/interfaces/column.interface'
import {ITableItems} from '@shared/interfaces/table-items.interface'
import {ICrudAction} from '@shared/interfaces/crud-action.interface'
import {IUser} from '@shared/interfaces/user.interface'
import {TCrudAction} from '@shared/types/crud-action.type'
import {getUsersAction} from '../../store/actions/users.action'
import {
  dialogCancelAction,
  dialogShowAction,
} from '@shared/store/actions/dialog.action'
import {IDeleteEvent} from '@shared/interfaces/event.interface'
import {
  dialogActionSelector,
  isLoadingSelector,
  usersSelector,
} from '../../store/selectors'
import {
  getAllPermissionsAction,
  getAllRolesAction,
} from '@shared/store/actions/session.actions'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  columns: IColumn[] = [
    {field: 'id', header: 'ID', width: 'w-1rem'},
    {field: 'username', header: 'Имя пользователя'},
    {field: 'email', header: 'E-Mail'},
  ]
  crudName = 'user'
  keyField = 'id'
  sortField = 'id'
  confirmField = 'username'

  isLoading$!: Observable<boolean>
  items$!: Observable<ITableItems<IUser> | null>
  dialog$!: Observable<ICrudAction | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.items$ = this.store.select(usersSelector)
    this.dialog$ = this.store.select(dialogActionSelector)
    this.store.dispatch(getAllRolesAction())
    this.store.dispatch(getAllPermissionsAction())
  }

  loadItems(
    event: LazyLoadEvent | null,
    action: number = TCrudAction.NONE
  ): void {
    this.store.dispatch(getUsersAction({event: event, action: action}))
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
}
