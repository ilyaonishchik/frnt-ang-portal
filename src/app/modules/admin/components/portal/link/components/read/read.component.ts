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

import {ILink} from '@modules/admin/sections/portal/links/interfaces/link.interface'
import {
  errorsSelector,
  isLoadingSelector,
  linkSelector,
} from '../../store/selectors'
import {getLinkAction} from '../../store/actions/link.action'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-link-read',
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

  item!: ILink

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeSubscriptions()
    this.fetchData()
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
    this.store
      .select(linkSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item: ILink | null) => {
        if (item) {
          this.item = item
        }
      })
  }

  fetchData(): void {
    this.store.dispatch(getLinkAction({id: this.itemId}))
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
