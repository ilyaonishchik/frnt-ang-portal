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

import {IPermission} from '@shared/interfaces/permission.interface'
import {
  getPermissionAction,
  updatePermissionAction,
} from '../../store/actions/permission.action'
import {
  errorsSelector,
  isLoadingSelector,
  permissionSelector,
} from '../../store/selectors'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-permission-update',
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

  item!: IPermission
  formValid = false
  statusItem = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
    this.store
      .select(permissionSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item: IPermission | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
        }
      })
  }

  private fetchData(): void {
    this.store.dispatch(getPermissionAction({id: this.itemId}))
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(
        updatePermissionAction({id: this.itemId, permission: this.item})
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

  changeItem(value: IPermission): void {
    this.item = {...value, status: this.statusItem}
  }

  changeStatus(event: boolean): void {
    this.statusItem = event
  }

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
