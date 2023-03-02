import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'
import {Observable, Subscription} from 'rxjs'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {Store} from '@ngrx/store'
import {
  categorySelector,
  errorsSelector,
  isLoadingSelector,
} from '@modules/admin/components/docs/category/store/selectors'
import {
  getCategoryAction,
  updateCategoryAction,
} from '@modules/admin/components/docs/category/store/actions/category.action'

@Component({
  selector: 'app-category-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: ICategory
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>
  formValid = false
  statusItem = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  private fetchData(): void {
    this.store.dispatch(getCategoryAction({id: this.itemId}))
  }

  private initializeListeners(): void {
    this.itemSubscription = this.store
      .select(categorySelector)
      .subscribe((item: ICategory | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
        }
      })
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(
        updateCategoryAction({id: this.itemId, category: this.item})
      )
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

  changeStatus(event: boolean) {
    this.statusItem = event
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }
}
