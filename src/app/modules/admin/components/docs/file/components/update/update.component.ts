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
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number

  item!: IFile
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

  private fetchData(): void {
    this.store.dispatch(getFileAction({id: this.itemId}))
  }

  private initializeListeners(): void {
    this.itemSubscription = this.store
      .select(fileSelector)
      .subscribe((item: IFile | null) => {
        if (item) {
          this.item = {...item}
          this.statusItem = item.status
        }
      })
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

  ngOnDestroy(): void {
    if (this.itemSubscription) {
      this.itemSubscription.unsubscribe()
    }
  }
}
