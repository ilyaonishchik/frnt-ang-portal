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

import {
  IPermission,
  IPermissionSave,
} from 'src/app/shared/interfaces/permission.interface'
import {
  getPermissionAction,
  updatePermissionAction,
} from '../../store/actions/permission.action'
import {
  errorsSelector,
  isLoadingSelector,
  permissionSelector,
} from '../../store/selectors'
import {IBackendErrors} from '../../../../../../shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-permission-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()
  @Input('itemId') itemId!: number

  itemSave!: IPermissionSave
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

  initializeListeners(): void {
    this.itemSubscription = this.store
      .pipe(select(permissionSelector))
      .subscribe((permission: IPermission | null) => {
        if (permission) {
          this.itemSave = {
            code: permission.code,
            name: permission.name,
            comment: permission.comment,
            status: permission.status,
          }
        }
      })
  }

  fetchData(): void {
    this.store.dispatch(getPermissionAction({id: this.itemId}))
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(
        updatePermissionAction({id: this.itemId, permission: this.itemSave})
      )
      // this.onVisibleChange(false)
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(values: IPermissionSave): void {
    this.itemSave = {...values}
  }

  ngOnDestroy() {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }
}