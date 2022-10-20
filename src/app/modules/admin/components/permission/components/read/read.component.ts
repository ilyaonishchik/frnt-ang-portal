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

import {IPermission} from 'src/app/shared/interfaces/permission.interface'
import {isLoadingSelector, permissionSelector} from '../../store/selectors'
import {getPermissionAction} from '../../store/actions/permission.action'

@Component({
  selector: 'app-permission-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()
  @Input('itemId') itemId!: number

  item!: IPermission
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
    this.initializeListeners()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
  }

  initializeListeners(): void {
    this.itemSubscription = this.store
      .pipe(select(permissionSelector))
      .subscribe((permission: IPermission | null) => {
        if (permission) {
          this.item = permission
        }
      })
  }

  fetchData(): void {
    this.store.dispatch(getPermissionAction({id: this.itemId}))
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  ngOnDestroy() {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }
}
