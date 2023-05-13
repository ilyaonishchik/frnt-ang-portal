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

import {
  errorsSelector,
  isLoadingSelector,
  menuSelector,
} from '../../store/selectors'
import {getMenuAction} from '../../store/actions/menu.action'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IMenu} from '@modules/admin/sections/portal/menus/interfaces/menu.interface'

@Component({
  selector: 'app-menu-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Input() subjectName = ''
  @Input() itemId!: number

  @Output() visibleChange = new EventEmitter<boolean>()

  private readonly unsubscribe$: Subject<void> = new Subject()
  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

  item!: IMenu

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
          this.item = item
        }
      })
  }

  private fetchData(): void {
    this.store.dispatch(getMenuAction({id: this.itemId}))
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
