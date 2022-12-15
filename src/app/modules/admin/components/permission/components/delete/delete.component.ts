import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {deletePermissionAction} from '../../store/actions/permission.action'
import {errorsSelector} from '../../store/selectors'

@Component({
  selector: 'app-permission-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()
  @Input() itemId!: number
  @Input() itemInfo: string | number | undefined = undefined
  @Output() clickCancel = new EventEmitter()

  validationErrors$!: Observable<IBackendErrors | null>

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
  }

  private initializeValues(): void {
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  confirmDelete(): void {
    this.store.dispatch(deletePermissionAction({id: this.itemId}))
  }

  cancelDelete(): void {
    this.clickCancel.emit()
  }
}
