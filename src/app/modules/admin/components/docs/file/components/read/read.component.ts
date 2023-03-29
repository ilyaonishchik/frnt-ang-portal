import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import {Observable, Subject, takeUntil} from 'rxjs'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {Store} from '@ngrx/store'
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'
import {
  errorsSelector,
  fileSelector,
  isLoadingSelector,
} from '@modules/admin/components/docs/file/store/selectors'
import {getFileAction} from '@modules/admin/components/docs/file/store/actions/file.action'

@Component({
  selector: 'app-file-read',
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

  item!: IFile

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeSubscriptions()
    this.fetchData()
  }

  private initializeSubscriptions(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
    this.store
      .select(fileSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item: IFile | null) => {
        if (item) {
          this.item = item
        }
      })
  }

  private fetchData(): void {
    this.store.dispatch(getFileAction({id: this.itemId}))
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
