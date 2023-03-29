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

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {
  errorsSelector,
  isLoadingSelector,
  menuSelector,
} from '../../store/selectors'
import {getMenuAction, updateMenuAction} from '../../store/actions/menu.action'
import {IMenu} from '@modules/admin/sections/portal/menus/interfaces/menu.interface'

@Component({
  selector: 'app-menu-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Input() itemId!: number

  @Output() visibleChange = new EventEmitter<boolean>()

  private readonly unsubscribe$: Subject<void> = new Subject()
  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

  item!: IMenu
  formValid = false
  statusItem = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeSubscriptions()
    this.fetchData()
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
    this.store
      .select(menuSelector)
      .pipe(takeUntil(this.unsubscribe$))
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
