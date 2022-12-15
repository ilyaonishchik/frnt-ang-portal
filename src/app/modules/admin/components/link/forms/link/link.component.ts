import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {ILink} from '../../../../sections/portal/links/interfaces/link.interface'

@Component({
  selector: 'app-link-form',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input('readOnly') readOnlyProps = false
  @Input('initialValues') initialValuesProps!: ILink

  @Output('changeValues') changeValuesEvent = new EventEmitter<ILink>()
  @Output('formValid') formValidEvent = new EventEmitter<boolean>()

  formLink!: FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.formLink = this.fb.group({
      name: [
        this.initialValuesProps.name,
        [Validators.required, Validators.maxLength(150)],
      ],
      website: [
        this.initialValuesProps.website,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150),
        ],
      ],
      comment: [this.initialValuesProps.comment, [Validators.maxLength(200)]],
      sort: [
        this.initialValuesProps.sort,
        [Validators.required, Validators.min(0), Validators.max(999)],
      ],
      status: [this.initialValuesProps.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeValuesEvent.emit(this.formLink.value)
  }

  onValidateForm(): void {
    this.formValidEvent.emit(this.formLink.valid)
  }

  get f() {
    return this.formLink.controls
  }
}
