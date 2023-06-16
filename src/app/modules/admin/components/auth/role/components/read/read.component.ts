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

import {IRoleFull} from '@shared/interfaces/role.interface'
import {
  errorsSelector,
  isLoadingSelector,
  roleSelector,
} from '../../store/selectors'
import {getRoleAction} from '../../store/actions/role.action'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-role-read',
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

  item!: IRoleFull

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeSubscriptions()
    this.initializeValues()
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
    this.store
      .select(roleSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item: IRoleFull | null) => {
        if (item) {
          this.item = item
        }
      })
  }

  private initializeValues(): void {
    this.store.dispatch(getRoleAction({id: this.itemId}))
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
