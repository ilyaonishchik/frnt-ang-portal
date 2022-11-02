import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {IPermissionSave} from 'src/app/shared/interfaces/permission.interface'
import {createPermissionAction} from '../../store/actions/permission.action'
import {errorsSelector} from '../../store/selectors'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-permission-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()

  itemSave!: IPermissionSave
  validationErrors$!: Observable<IBackendErrors | null>
  formValid: boolean = false

  constructor(private store: Store) {
    this.itemSave = {
      code: '',
      name: '',
      comment: null,
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
      this.store.dispatch(createPermissionAction({permission: this.itemSave}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(values: IPermissionSave): void {
    this.itemSave = {...values}
  }
}
