import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {IPermissionSave} from 'src/app/shared/interfaces/permission.interface'

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  @Input('readOnly') readOnlyProps: boolean = false
  @Input('initialValues') initialValuesProps!: IPermissionSave

  @Output('changeValues') changeValuesEvent =
    new EventEmitter<IPermissionSave>()
  @Output('formValid') formValidEvent = new EventEmitter<boolean>()

  formPermission!: FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.formPermission = this.fb.group({
      code: [this.initialValuesProps.code, [Validators.required]],
      name: [this.initialValuesProps.name, [Validators.required]],
      comment: [this.initialValuesProps.comment],
      status: [this.initialValuesProps.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeValuesEvent.emit(this.formPermission.value)
  }

  onValidateForm(): void {
    this.formValidEvent.emit(this.formPermission.valid)
  }

  get f() {
    return this.formPermission.controls
  }
}
