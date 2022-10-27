import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {select, Store} from '@ngrx/store'
import {deletePermissionAction} from '../../store/actions/permission.action'
import {Observable} from 'rxjs'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {errorsSelector} from '../../store/selectors'

@Component({
  selector: 'app-permission-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>()
  @Input('itemId') itemId!: number
  @Input('itemInfo') itemInfo: string | number | undefined = undefined
  @Output('clickCancel') onClickCancel = new EventEmitter<any>()

  validationErrors$!: Observable<IBackendErrors | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.validationErrors$ = this.store.pipe(select(errorsSelector))
  }
  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  confirmDelete(): void {
    this.store.dispatch(deletePermissionAction({id: this.itemId}))
  }

  cancelDelete(): void {
    this.onClickCancel.emit()
  }
}
