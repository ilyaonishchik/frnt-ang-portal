import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {errorsSelector} from '../../store/selectors'
import {deleteRoleAction} from '../../store/actions/role.action'

@Component({
  selector: 'app-role-delete',
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

  cancelDelete(): void {
    this.clickCancel.emit()
  }

  confirmDelete(): void {
    this.store.dispatch(deleteRoleAction({id: this.itemId}))
  }
}
