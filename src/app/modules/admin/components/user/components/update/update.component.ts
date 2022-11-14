import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {Observable, Subscription} from 'rxjs'

import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IUser} from 'src/app/shared/interfaces/user.interface'
import {
  errorsSelector,
  isLoadingSelector,
  userSelector,
} from '../../store/selectors'
import {getUserAction, updateUserAction} from '../../store/actions/user.action'

@Component({
  selector: 'app-user-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()
  @Input('itemId') itemId!: number

  item!: IUser
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>
  formValid: boolean = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.validationErrors$ = this.store.pipe(select(errorsSelector))
  }

  fetchData(): void {
    this.store.dispatch(getUserAction({id: this.itemId}))
  }

  initializeListeners(): void {
    this.itemSubscription = this.store
      .pipe(select(userSelector))
      .subscribe((user: IUser | null) => {
        if (user) {
          this.item = {...user}
        }
      })
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  changeItem(value: IUser): void {
    this.item = {...value}
  }

  onValidate(value: boolean): void {
    this.formValid = value
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(updateUserAction({id: this.itemId, user: this.item}))
    }
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }
}
