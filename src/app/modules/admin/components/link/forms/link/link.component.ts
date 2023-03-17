import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ILink} from '@modules/admin/sections/portal/links/interfaces/link.interface'

@Component({
  selector: 'app-link-form',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent implements OnInit {
  @Input() readOnly = false
  @Input() initialValues!: ILink

  @Output() changeValues = new EventEmitter<ILink>()
  @Output() formValid = new EventEmitter<boolean>()

  formLink!: FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.formLink = this.fb.group({
      name: [
        this.initialValues.name,
        [Validators.required, Validators.maxLength(150)],
      ],
      website: [
        this.initialValues.website,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(150),
        ],
      ],
      comment: [this.initialValues.comment, [Validators.maxLength(200)]],
      sort: [
        this.initialValues.sort,
        [Validators.required, Validators.min(0), Validators.max(999)],
      ],
      status: [this.initialValues.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeValues.emit(this.formLink.value)
  }

  onValidateForm(): void {
    this.formValid.emit(this.formLink.valid)
  }

  get f() {
    return this.formLink.controls
  }
}
