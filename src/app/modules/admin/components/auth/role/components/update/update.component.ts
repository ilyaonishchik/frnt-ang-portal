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

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IRole, IRoleFull} from '@shared/interfaces/role.interface'
import {getRoleAction, updateRoleAction} from '../../store/actions/role.action'
import {
  errorsSelector,
  isLoadingSelector,
  roleSelector,
} from '../../store/selectors'

@Component({
  selector: 'app-role-update',
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

  item!: IRoleFull
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
      .select(roleSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item: IRoleFull | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
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

  changeItem(value: IRoleFull): void {
    this.item = {...value, status: this.statusItem}
  }

  onValidate(value: boolean): void {
    this.formValid = value
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(updateRoleAction({id: this.itemId, role: this.item}))
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
