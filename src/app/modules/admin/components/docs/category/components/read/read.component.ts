import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, Subscription} from 'rxjs'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {ICategory} from '@modules/admin/sections/docs/categories/interfaces/category.interface'
import {
  categorySelector,
  errorsSelector,
  isLoadingSelector,
} from '@modules/admin/components/docs/category/store/selectors'
import {getCategoryAction} from '@modules/admin/components/docs/category/store/actions/category.action'

@Component({
  selector: 'app-category-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: ICategory
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

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
          this.item = item
        }
      })
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }
}
