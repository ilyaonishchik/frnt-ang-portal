import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IUserInfo} from 'src/app/shared/interfaces/user.interface'
import {IActionErrorResponse} from 'src/app/shared/interfaces/action-error-response.interface'
import {FormBuilder, FormGroup} from '@angular/forms'
import {IFormInitialValues} from 'src/app/shared/interfaces/form-initial-values.interface'

@Component({
  selector: 'app-form-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements IFormInitialValues, OnInit {
  @Input('initialValues') initialValues: any

  // @Input('initialValues') initialValuesProps!: IUserInfo
  // @Input('isSubmitting') isSubmittingProps: boolean = false
  // @Input('errors') errorsProps: IActionErrorResponse | null = null
  // @Input('isReadOnly') isReadOnlyProps: boolean = false

  // @Output('itemSubmit') itemSubmitEvent = new EventEmitter<IUserInfo>()

  // form!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    console.log(this.initialValues)
    // this.form = this.fb.group({
    //   username: [this.initialValuesProps.username],
    //   email: [this.initialValuesProps.email],
    //   comment: [this.initialValuesProps.comment],
    //   avatar: [this.initialValuesProps.avatar],
    //   roles: [this.initialValuesProps.roles],
    //   permissions: [this.initialValuesProps.permissions],
    //   status: [this.initialValuesProps.status],
    // })
    // this.form = this.fb.group({
    //   username: [this.data.username],
    //   email: [this.data.email],
    //   comment: [this.data.comment],
    //   avatar: [this.data.avatar],
    //   roles: [this.data.roles],
    //   permissions: [this.data.permissions],
    //   status: [this.data.status],
    // })
  }

  onSubmit(): void {
    // this.itemSubmitEvent.emit(this.form.value)
  }
}
