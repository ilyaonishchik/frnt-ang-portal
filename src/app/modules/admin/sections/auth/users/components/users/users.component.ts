import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IUser, IUserInfo} from 'src/app/shared/interfaces/user.interface'
import {getUsersAction} from '../../store/actions/users.action'
import {isLoadingSelector, usersSelector} from '../../store/selectors'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  columns: IColumn[]
  crudName: string

  isLoading$!: Observable<boolean>
  users$!: Observable<ITableItems<IUser> | null>

  currentItem: IUserInfo = {
    id: 0,
    username: '1',
    email: '2',
    avatar: null,
    comment: '3',
    roles: [],
    permissions: [],
    status: 1,
  }

  dialogVisible: boolean = false

  constructor(private store: Store) {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'username', header: 'Пользователь'},
      {field: 'email', header: 'Email'},
      {field: 'comment', header: 'Описание'},
    ]
    this.crudName = 'user'
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.users$ = this.store.pipe(select(usersSelector))
  }

  loadItems(event: LazyLoadEvent): void {
    this.store.dispatch(getUsersAction({event}))
  }

  createItem(event: any): void {
    console.log('create', event)
  }
  readItem(event: any): void {
    this.dialogVisible = true
  }
  updateItem(event: any): void {
    console.log('update', event)
  }
  deleteItem(event: any): void {
    console.log('delete', event)
  }
}
