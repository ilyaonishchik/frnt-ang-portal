import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {IPermissionFull} from '@shared/interfaces/permission.interface'
import {createPermissionAction} from '../../store/actions/permission.action'
import {errorsSelector} from '../../store/selectors'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {TCrudAction} from '@shared/types/crud-action.type'

@Component({
  selector: 'app-permission-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() visible = false
  @Input() subjectName = ''

  @Output() visibleChange = new EventEmitter<boolean>()

  validationErrors$!: Observable<IBackendErrors | null>

  crudAction: TCrudAction = TCrudAction.CREATE
  item!: IPermissionFull
  formValid = false
  statusItem = true

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues()
    this.initializeSubscriptions()
  }

  private initializeValues(): void {
    this.item = {
      id: 0,
      code: '',
      name: '',
      comment: null,
      roles: [],
      users: [],
      status: true,
    }
  }

  private initializeSubscriptions(): void {
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(createPermissionAction({permission: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: IPermissionFull): void {
    this.item = {...value, status: this.statusItem}
  }

  changeStatus(event: boolean): void {
    this.statusItem = event
  }
}
