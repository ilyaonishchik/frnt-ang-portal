import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {IPermission} from '@shared/interfaces/permission.interface'

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  @Input('readOnly') readOnlyProps = false
  @Input('initialValues') initialValuesProps!: IPermission

  @Output('changeValues') changeValuesEvent = new EventEmitter<IPermission>()
  @Output('formValid') formValidEvent = new EventEmitter<boolean>()

  formPermission!: FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.formPermission = this.fb.group({
      code: [
        this.initialValuesProps.code,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      name: [
        this.initialValuesProps.name,
        [Validators.required, Validators.maxLength(150)],
      ],
      comment: [this.initialValuesProps.comment, [Validators.maxLength(200)]],
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
