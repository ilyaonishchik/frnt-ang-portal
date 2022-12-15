import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {Store} from '@ngrx/store'

import {IUser} from '@shared/interfaces/user.interface'
import {
  errorsSelector,
  isLoadingSelector,
  userSelector,
} from '../../store/selectors'
import {getUserAction} from '../../store/actions/user.action'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-user-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: IUser
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  private fetchData(): void {
    this.store.dispatch(getUserAction({id: this.itemId}))
  }

  private initializeListeners(): void {
    this.itemSubscription = this.store
      .select(userSelector)
      .subscribe((item: IUser | null) => {
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
