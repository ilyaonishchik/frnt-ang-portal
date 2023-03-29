import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {SelectItem} from 'primeng/api'
import {IMenu} from '@modules/admin/sections/portal/menus/interfaces/menu.interface'

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() readOnly = false
  @Input() initialValues!: IMenu

  @Output() changeValues = new EventEmitter<IMenu>()
  @Output() formValid = new EventEmitter<boolean>()

  formMenu!: FormGroup
  menuTypes: SelectItem[] = []

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.formMenu = this.fb.group({
      parent: [this.initialValues.parent, [Validators.min(0)]],
      type: [this.initialValues.type, [Validators.required]],
      label: [
        this.initialValues.label,
        [Validators.required, Validators.maxLength(100)],
      ],
      icon: [this.initialValues.icon, [Validators.maxLength(50)]],
      link: [
        this.initialValues.link,
        [Validators.minLength(1), Validators.maxLength(200)],
      ],
      permission: [this.initialValues.permission, [Validators.maxLength(100)]],
      comment: [this.initialValues.comment, [Validators.maxLength(200)]],
      sort: [
        this.initialValues.sort,
        [Validators.required, Validators.min(0), Validators.max(999)],
      ],
      separator: [this.initialValues.separator],
      status: [this.initialValues.status],
    })
    this.menuTypes = [
      {label: 'Меню админки', value: 1},
      {label: 'Общее меню', value: 2},
      {label: 'Верхнее меню', value: 3},
    ]
    this.onChangeValues()
  }

  onChangeValues(): void {
    this.onValidateForm()
    this.changeValues.emit(this.formMenu.value)
  }

  onValidateForm(): void {
    this.formValid.emit(this.formMenu.valid)
  }

  get f() {
    return this.formMenu.controls
  }
}
