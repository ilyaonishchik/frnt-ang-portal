import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {Observable, Subject, takeUntil} from 'rxjs'
import {Store} from '@ngrx/store'

import {IUser} from '@shared/interfaces/user.interface'
import {
  errorsSelector,
  isLoadingSelector,
  userSelector,
} from '../../store/selectors'
import {getUserAction} from '../../store/actions/user.action'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {TCrudAction} from '@shared/types/crud-action.type'

@Component({
  selector: 'app-user-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Input() subjectName = ''
  @Input() itemId!: number

  @Output() visibleChange = new EventEmitter<boolean>()

  private readonly unsubscribe$: Subject<void> = new Subject()
  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

  crudAction: TCrudAction = TCrudAction.READ
  item!: IUser

  constructor(private store: Store) {}

  ngOnInit() {
    this.initializeSubscriptions()
    this.initializeValues()
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
    this.store
      .select(userSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item: IUser | null) => {
        if (item) {
          this.item = item
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

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
