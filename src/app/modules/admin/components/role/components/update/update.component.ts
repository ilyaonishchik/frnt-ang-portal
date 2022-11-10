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

import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {IRole} from 'src/app/shared/interfaces/role.interface'
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
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()
  @Input('itemId') itemId!: number

  item!: IRole
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

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.validationErrors$ = this.store.pipe(select(errorsSelector))
  }

  private fetchData(): void {
    this.store.dispatch(getRoleAction({id: this.itemId}))
  }

  private initializeListeners(): void {
    this.itemSubscription = this.store
      .pipe(select(roleSelector))
      .subscribe((role: IRole | null) => {
        if (role) {
          this.item = {...role}
        }
      })
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  changeItem(value: IRole): void {
    this.item = {...value}
  }

  onValidate(value: boolean): void {
    this.formValid = value
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(updateRoleAction({id: this.itemId, role: this.item}))
    }
  }
}
