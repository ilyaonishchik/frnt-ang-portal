import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Observable} from 'rxjs'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {Store} from '@ngrx/store'
import {errorsSelector} from '@modules/admin/components/docs/file/store/selectors'
import {deleteFileAction} from '@modules/admin/components/docs/file/store/actions/file.action'

@Component({
  selector: 'app-file-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  @Input() visible = false
  @Input() subjectName = ''
  @Input() itemId!: number
  @Input() itemInfo: string | number | undefined = undefined

  @Output() visibleChange = new EventEmitter<boolean>()

  validationErrors$!: Observable<IBackendErrors | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeSubscriptions()
  }

  private initializeSubscriptions(): void {
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  confirmDelete(): void {
    this.store.dispatch(deleteFileAction({id: this.itemId}))
  }
}
