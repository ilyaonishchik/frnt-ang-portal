import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'

@Component({
  selector: 'app-category-form',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  @Input() readOnly = false
  @Input() initialValues!: ICategory

  @Output() changeValues = new EventEmitter<ICategory>()
  @Output() formValid = new EventEmitter<boolean>()

  formCategory!: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  private initializeForm(): void {
    this.formCategory = this.fb.group({
      parent: [this.initialValues.parent],
      cat_name: [
        this.initialValues.cat_name,
        [Validators.required, Validators.maxLength(255)],
      ],
      cat_desc: [this.initialValues.cat_desc, [Validators.maxLength(255)]],
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
    this.changeValues.emit(this.formCategory.value)
  }

  private onValidateForm(): void {
    this.formValid.emit(this.formCategory.valid)
  }

  get f() {
    return this.formCategory.controls
  }
}
