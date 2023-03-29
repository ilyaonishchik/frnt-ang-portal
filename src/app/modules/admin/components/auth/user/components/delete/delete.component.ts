import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {deleteUserAction} from '../../store/actions/user.action'
import {errorsSelector} from '../../store/selectors'

@Component({
  selector: 'app-user-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  @Input() visible = false
  @Input() subjectName = ''
  @Input() itemId!: number
  @Input() itemInfo: string | number | undefined = undefined

  @Output() visibleChange = new EventEmitter<boolean>()
  @Output() clickCancel = new EventEmitter()

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

  cancelDelete(): void {
    this.clickCancel.emit()
  }

  confirmDelete(): void {
    this.store.dispatch(deleteUserAction({id: this.itemId}))
  }
}
