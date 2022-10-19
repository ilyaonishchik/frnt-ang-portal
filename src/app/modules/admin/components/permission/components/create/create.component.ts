import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

import {IPermissionSave} from 'src/app/shared/interfaces/permission.interface'
import {Store} from '@ngrx/store'
import {createPermissionAction} from '../../store/actions/permission.action'

@Component({
  selector: 'app-permission-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>()

  item: IPermissionSave
  formValid: boolean = false

  constructor(private store: Store) {
    this.item = {
      code: '',
      name: '',
      comment: null,
      status: 1,
    }
  }

  ngOnInit(): void {}

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(createPermissionAction({permission: this.item}))
      this.onVisibleChange(false)
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
    this.item = {...values}
  }
}
