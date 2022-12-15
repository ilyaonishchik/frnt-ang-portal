import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {IMenu} from '../../../../sections/portal/menus/interfaces/menu.interface'

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input('readOnly') readOnlyProps = false
  @Input('initialValues') initialValuesProps!: IMenu

  @Output('changeValues') changeValuesEvent = new EventEmitter<IMenu>()
  @Output('formValid') formValidEvent = new EventEmitter<boolean>()

  formMenu!: FormGroup
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.formMenu = this.fb.group({
      parent: [this.initialValuesProps.parent, [Validators.min(0)]],
      type: [
        this.initialValuesProps.type,
        [Validators.required, Validators.min(1), Validators.max(999)],
      ],
      label: [
        this.initialValuesProps.label,
        [Validators.required, Validators.maxLength(100)],
      ],
      icon: [this.initialValuesProps.icon, [Validators.maxLength(50)]],
      link: [
        this.initialValuesProps.link,
        [Validators.minLength(1), Validators.maxLength(200)],
      ],
      permission: [
        this.initialValuesProps.permission,
        [Validators.maxLength(100)],
      ],
      comment: [this.initialValuesProps.comment, [Validators.maxLength(200)]],
      sort: [
        this.initialValuesProps.sort,
        [Validators.required, Validators.min(0), Validators.max(999)],
      ],
      separator: [this.initialValuesProps.separator],
      status: [this.initialValuesProps.status],
    })
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeValuesEvent.emit(this.formMenu.value)
  }

  onValidateForm(): void {
    this.formValidEvent.emit(this.formMenu.valid)
  }

  get f() {
    return this.formMenu.controls
  }
}
