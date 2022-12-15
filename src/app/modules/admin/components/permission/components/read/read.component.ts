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

import {IPermission} from '@shared/interfaces/permission.interface'
import {
  errorsSelector,
  isLoadingSelector,
  permissionSelector,
} from '../../store/selectors'
import {getPermissionAction} from '../../store/actions/permission.action'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-permission-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: IPermission
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  private initializeListeners(): void {
    this.itemSubscription = this.store
      .select(permissionSelector)
      .subscribe((item: IPermission | null) => {
        if (item) {
          this.item = item
        }
      })
  }

  private fetchData(): void {
    this.store.dispatch(getPermissionAction({id: this.itemId}))
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
