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

import {ILink} from '@modules/admin/sections/portal/links/interfaces/link.interface'
import {
  errorsSelector,
  isLoadingSelector,
  linkSelector,
} from '../../store/selectors'
import {getLinkAction} from '../../store/actions/link.action'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-link-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: ILink
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  initializeListeners(): void {
    this.itemSubscription = this.store
      .select(linkSelector)
      .subscribe((item: ILink | null) => {
        if (item) {
          this.item = item
        }
      })
  }

  fetchData(): void {
    this.store.dispatch(getLinkAction({id: this.itemId}))
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
