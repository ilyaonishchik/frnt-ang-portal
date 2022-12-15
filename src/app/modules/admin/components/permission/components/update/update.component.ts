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
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: IPermission
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>
  formValid = false
  statusItem = 0

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

  private initializeListeners(): void {
    this.itemSubscription = this.store
      .select(permissionSelector)
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

  changeStatus(event: number): void {
    this.statusItem = event
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }
}
