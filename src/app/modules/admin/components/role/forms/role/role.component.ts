import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {IRoleSave} from 'src/app/shared/interfaces/role.interface'

@Component({
  selector: 'app-role-form',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  @Input('readOnly') readOnlyProps: boolean = false
  @Input('initialValues') initialValuesProps!: IRoleSave

  @Output('changeValues') changeValuesEvent = new EventEmitter<IRoleSave>()
  @Output('formValid') formValidEvent = new EventEmitter<boolean>()

  formRole!: FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.formRole = this.fb.group({
      code: [this.initialValuesProps.code, [Validators.required]],
      name: [this.initialValuesProps.name, [Validators.required]],
      comment: [this.initialValuesProps.comment],
      status: [this.initialValuesProps.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeValuesEvent.emit(this.formRole.value)
  }

  private onValidateForm(): void {
    this.formValidEvent.emit(this.formRole.valid)
  }

  get f() {
    return this.formRole.controls
  }
}
