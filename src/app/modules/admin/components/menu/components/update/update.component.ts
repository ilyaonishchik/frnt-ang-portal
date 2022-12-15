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

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IMenu} from '../../../../sections/portal/menus/interfaces/menu.interface'
import {
  errorsSelector,
  isLoadingSelector,
  menuSelector,
} from '../../store/selectors'
import {getMenuAction, updateMenuAction} from '../../store/actions/menu.action'

@Component({
  selector: 'app-menu-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: IMenu
  itemSubscription!: Subscription

  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>
  formValid = false
  statusItem = false

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
      .select(menuSelector)
      .subscribe((item: IMenu | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
        }
      })
  }

  private fetchData(): void {
    this.store.dispatch(getMenuAction({id: this.itemId}))
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(updateMenuAction({id: this.itemId, menu: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: IMenu): void {
    this.item = {...value, status: this.statusItem}
  }

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }

  changeStatus(event: boolean) {
    this.statusItem = event
  }
}
