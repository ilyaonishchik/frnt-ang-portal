import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {IPermission} from '@shared/interfaces/permission.interface'
import {createPermissionAction} from '../../store/actions/permission.action'
import {errorsSelector} from '../../store/selectors'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-permission-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()

  item!: IPermission
  validationErrors$!: Observable<IBackendErrors | null>
  formValid = false
  statusItem = 1

  constructor(private store: Store) {
    this.item = {
      id: 0,
      code: '',
      name: '',
      comment: null,
      status: 1,
    }
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  private initializeValues(): void {
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

  changeItem(value: IPermission): void {
    this.item = {...value, status: this.statusItem}
  }

  changeStatus(event: number): void {
    this.statusItem = event
  }
}
