import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {Observable, Subscription} from 'rxjs'
import {select, Store} from '@ngrx/store'

import {IUser} from 'src/app/shared/interfaces/user.interface'
import {isLoadingSelector, userSelector} from '../../store/selectors'
import {getUserAction} from '../../store/actions/user.action'

@Component({
  selector: 'app-user-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()
  @Input('itemId') itemId!: number

  item!: IUser
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
  }

  fetchData(): void {
    this.store.dispatch(getUserAction({id: this.itemId}))
  }

  initializeListeners(): void {
    this.itemSubscription = this.store
      .pipe(select(userSelector))
      .subscribe((user: IUser | null) => {
        if (user) {
          this.item = user
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
