import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {IRole} from 'src/app/shared/interfaces/role.interface'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {errorsSelector} from '../../store/selectors'
import {createRoleAction} from '../../store/actions/role.action'

@Component({
  selector: 'app-role-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()

  item!: IRole
  validationErrors$!: Observable<IBackendErrors | null>
  formValid: boolean = false

  constructor(private store: Store) {
    this.item = {
      id: 0,
      code: '',
      name: '',
      comment: null,
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
      this.store.dispatch(createRoleAction({role: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: IRole): void {
    this.item = {...value}
  }
}
