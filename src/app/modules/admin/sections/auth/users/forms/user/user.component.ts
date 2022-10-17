import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IUserInfo} from 'src/app/shared/interfaces/user.interface'
import {IActionErrorResponse} from 'src/app/shared/interfaces/action-error-response.interface'
import {FormBuilder, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-form-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input('initialValues') initialValuesProps!: IUserInfo
  @Input('isSubmitting') isSubmittingProps: boolean = false
  @Input('errors') errorsProps: IActionErrorResponse | null = null

  @Output('itemSubmit') itemSubmitEvent = new EventEmitter<IUserInfo>()

  form!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: [this.initialValuesProps.username],
      email: [this.initialValuesProps.email],
      comment: [this.initialValuesProps.comment],
      avatar: [this.initialValuesProps.avatar],
      roles: [this.initialValuesProps.roles],
      permissions: [this.initialValuesProps.permissions],
      status: [this.initialValuesProps.status],
    })
  }

  onSubmit(): void {
    this.itemSubmitEvent.emit(this.form.value)
  }
}
