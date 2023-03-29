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
import {IFile} from '@modules/admin/sections/docs/files/interfaces/file.interface'
import {
  errorsSelector,
  fileSelector,
  isLoadingSelector,
} from '@modules/admin/components/docs/file/store/selectors'
import {
  getFileAction,
  updateFileAction,
} from '@modules/admin/components/docs/file/store/actions/file.action'

@Component({
  selector: 'app-file-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit, OnDestroy {
  @Input() visible = false
  @Input() subjectName = ''
  @Input() itemId!: number

  @Output() visibleChange = new EventEmitter<boolean>()

  private readonly unsubscribe$: Subject<void> = new Subject()
  isLoading$!: Observable<boolean>
  validationErrors$!: Observable<IBackendErrors | null>

  item!: IFile
  formValid = false
  statusItem = false

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  private initializeValues(): void {
    this.isLoading$ = this.store.select(isLoadingSelector)
    this.validationErrors$ = this.store.select(errorsSelector)
    this.store
      .select(fileSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((item: IFile | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
        }
      })
  }

  private fetchData(): void {
    this.store.dispatch(getFileAction({id: this.itemId}))
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(updateFileAction({id: this.itemId, file: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: IFile): void {
    this.item = {...value, status: this.statusItem}
  }

  changeStatus(event: boolean) {
    this.statusItem = event
  }

  private finalizeSubscriptions(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  ngOnDestroy(): void {
    this.finalizeSubscriptions()
  }
}
