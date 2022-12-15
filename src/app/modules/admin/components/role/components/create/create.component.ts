import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Observable} from 'rxjs'
import {Store} from '@ngrx/store'

import {IRole} from '@shared/interfaces/role.interface'
import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {errorsSelector} from '../../store/selectors'
import {createRoleAction} from '../../store/actions/role.action'

@Component({
  selector: 'app-role-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()

  item!: IRole
  validationErrors$!: Observable<IBackendErrors | null>
  formValid = false
  statusItem = 1

  constructor(private store: Store) {
    this.item = {
      id: 0,
      code: '',
      name: '',
      comment: null,
      permissions: [],
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
      this.store.dispatch(createRoleAction({role: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: IRole): void {
    this.item = {...value, status: this.statusItem}
  }

  changeStatus(event: number): void {
    this.statusItem = event
  }
}
