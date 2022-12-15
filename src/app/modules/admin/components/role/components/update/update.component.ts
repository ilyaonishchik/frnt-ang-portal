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

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IRole} from '@shared/interfaces/role.interface'
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
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: IRole
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

  private initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  private fetchData(): void {
    this.store.dispatch(getRoleAction({id: this.itemId}))
  }

  private initializeListeners(): void {
    this.itemSubscription = this.store
      .select(roleSelector)
      .subscribe((item: IRole | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
        }
      })
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  changeItem(value: IRole): void {
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

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }

  changeStatus(event: number): void {
    this.statusItem = event
  }
}
