import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable, Subject, takeUntil} from 'rxjs'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IUserFull} from '@shared/interfaces/user.interface'
import {
  errorsSelector,
  isLoadingSelector,
  userSelector,
} from '../../store/selectors'
import {getUserAction, updateUserAction} from '../../store/actions/user.action'
import {TCrudAction} from '@shared/types/crud-action.type'

@Component({
  selector: 'app-user-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Input() subjectName = ''
  @Input() itemId!: number

  @Output() visibleChange = new EventEmitter<boolean>()

  private readonly unsubscribe$: Subject<void> = new Subject()
  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

  crudAction: TCrudAction = TCrudAction.UPDATE
  item!: IUserFull
  formValid = false
  statusItem = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeSubscriptions()
    this.initializeValues()
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
    this.store
      .select(userSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item: IUserFull | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
        }
      })
  }

  private initializeValues(): void {
    this.store.dispatch(getUserAction({id: this.itemId}))
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  changeItem(value: IUserFull): void {
    this.item = {...value, status: this.statusItem}
  }

  onValidate(value: boolean): void {
    this.formValid = value
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(updateUserAction({id: this.itemId, user: this.item}))
    }
  }

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  changeStatus(event: boolean): void {
    this.statusItem = event
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
