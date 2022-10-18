import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {LazyLoadEvent} from 'primeng/api'

import {IColumn} from 'src/app/shared/interfaces/column.interface'
import {ITableItems} from 'src/app/shared/interfaces/table-items.interface'
import {IUser, IUserInfo} from 'src/app/shared/interfaces/user.interface'
import {getUsersAction} from '../../store/actions/users.action'
import {isLoadingSelector, usersSelector} from '../../store/selectors'
import {userSelector} from '../../../../../components/user/store/selectors'
import {getUserAction} from '../../../../../components/user/store/actions/user.action'
import {IFormInitialValues} from 'src/app/shared/interfaces/form-initial-values.interface'
import {FormValuesComponent} from 'src/app/shared/classes/form.class'
import {UserComponent} from '../../../../../components/user/forms/user/user.component'
import {FormDirective} from '../../../../../../../shared/directives/form.directive'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  columns: IColumn[]
  crudName: string

  formName!: FormValuesComponent

  isLoading$!: Observable<boolean>
  users$!: Observable<ITableItems<IUser> | null>
  item$!: Observable<IUserInfo | null>

  // currentItem: IUserInfo = {
  //   id: 0,
  //   username: '1',
  //   email: '2',
  //   avatar: null,
  //   comment: '3',
  //   last_login: null,
  //   verify: null,
  //   roles: [],
  //   permissions: [],
  //   status: 1,
  // }

  dialogVisible: boolean = false
  isReadOnly: boolean = false

  @ViewChild(FormDirective, {static: true}) frm!: FormDirective
  // private viewRef!: ViewContainerRef
  private viewContainerRef!: ViewContainerRef

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
    // this.formName = new FormValuesComponent(UserComponent, {})
    this.viewContainerRef = this.frm.viewContainerRef
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.users$ = this.store.pipe(select(usersSelector))
    this.item$ = this.store.pipe(select(userSelector))
  }

  loadItems(event: LazyLoadEvent): void {
    this.store.dispatch(getUsersAction({event}))
  }

  createItem(event: any): void {
    console.log('create', event)
    this.isReadOnly = false
  }

  readItem(id: number): void {
    console.log('read', id)
    this.dialogVisible = true
    this.isReadOnly = true
    // this.formName.data = this.item$
    this.store.dispatch(getUserAction({id}))
    this.viewContainerRef.clear()
    this.formName = new FormValuesComponent(UserComponent, this.item$)
    const componentRef =
      this.viewContainerRef.createComponent<IFormInitialValues>(
        this.formName.component
      )
    componentRef.instance.initialValues = this.formName.initialValues
  }

  updateItem(event: any): void {
    console.log('update', event)
    this.isReadOnly = false
  }

  deleteItem(event: any): void {
    console.log('delete', event)
  }

  saveItem(item: IUserInfo): void {
    console.log('saveItem', item)
    this.dialogVisible = false
  }

  hideDialog(): void {
    this.dialogVisible = false
    this.viewContainerRef.clear()
  }
}
