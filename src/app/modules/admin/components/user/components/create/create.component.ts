import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IUser} from 'src/app/shared/interfaces/user.interface'
import {errorsSelector} from '../../store/selectors'
import {createUserAction} from '../../store/actions/user.action'

@Component({
  selector: 'app-user-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()

  item!: IUser
  validationErrors$!: Observable<IBackendErrors | null>
  formValid: boolean = false

  constructor(private store: Store) {
    this.item = {
      id: 0,
      username: '',
      email: null,
      comment: null,
      avatar: null,
      verify: null,
      last_login: null,
      sd_id: null,
      roles: [],
      permissions: [],
      status: 1,
    }
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.validationErrors$ = this.store.pipe(select(errorsSelector))
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(createUserAction({user: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: IUser): void {
    this.item = {...value}
  }
}
