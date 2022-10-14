import {Component, OnInit} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IUser} from 'src/app/shared/interfaces/user.interface'

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

  constructor(private store: Store) {
    this.columns = [
      {field: 'id', header: 'ID', width: 'w-1rem'},
      {field: 'username', header: 'Пользователь'},
      {field: 'email', header: 'Email'},
      {field: 'comment', header: 'Описание'},
    ]
    this.crudName = 'user'
  }

  ngOnInit(): void {}

  initializeValues(): void {
    // this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    // this.users$ = this.store.pipe(select(rolesSelector))
  }

  loadItems(event: LazyLoadEvent): void {
    // this.store.dispatch(getUsersAction(event))
  }
}
