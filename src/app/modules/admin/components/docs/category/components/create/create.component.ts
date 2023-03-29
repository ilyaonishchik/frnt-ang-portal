import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Store} from '@ngrx/store'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'
import {Observable} from 'rxjs'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {errorsSelector} from '@modules/admin/components/docs/category/store/selectors'
import {createCategoryAction} from '@modules/admin/components/docs/category/store/actions/category.action'

@Component({
  selector: 'app-category-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() visible = false

  @Output() visibleChange = new EventEmitter<boolean>()

  validationErrors$!: Observable<IBackendErrors | null>

  item!: ICategory
  formValid = false
  statusItem = true

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
  }

  private initializeValues(): void {
    this.item = {
      id: 0,
      parent: null,
      cat_name: '',
      cat_desc: null,
      sort: 999,
      status: true,
    }
  }

  private initializeSubscriptions(): void {
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(createCategoryAction({category: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: ICategory): void {
    this.item = {...value, status: this.statusItem}
  }

  changeStatus(event: boolean): void {
    this.statusItem = event
  }
}
