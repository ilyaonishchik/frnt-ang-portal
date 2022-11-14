import {Component, OnInit} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {ICrudAction} from 'src/app/shared/interfaces/crud-action.interface'
import {IUser} from 'src/app/shared/interfaces/user.interface'
import {TCrudAction} from 'src/app/shared/types/crud-action.type'
import {getUsersAction} from '../../store/actions/users.action'
import {
  dialogCancelAction,
  dialogShowAction,
} from 'src/app/shared/store/actions/dialogs.action'
import {IDeleteEvent} from 'src/app/shared/interfaces/event.interface'
import {
  dialogActionSelector,
  isLoadingSelector,
  usersSelector,
} from '../../store/selectors'

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
  crudName: string = 'user'
  keyField: string = 'id'
  sortField: string = 'id'
  confirmField: string = 'username'

  isLoading$!: Observable<boolean>
  users$!: Observable<ITableItems<IUser> | null>
  dialog$!: Observable<ICrudAction | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.loadItems({sortField: this.sortField, first: 0}, TCrudAction.NONE)
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.users$ = this.store.pipe(select(usersSelector))
    this.dialog$ = this.store.pipe(select(dialogActionSelector))
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
