import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {errorsSelector} from '../../store/selectors'
import {createMenuAction} from '../../store/actions/menu.action'
import {IMenu} from '@modules/admin/sections/portal/menus/interfaces/menu.interface'

@Component({
  selector: 'app-menu-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() visible = false

  @Output() visibleChange = new EventEmitter<boolean>()

  validationErrors$!: Observable<IBackendErrors | null>

  item!: IMenu
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
      parent: 0,
      type: 2,
      label: '',
      icon: null,
      link: null,
      permission: null,
      comment: null,
      separator: false,
      sort: 999,
      status: true,
    }
  }

  private initializeSubscriptions(): void {
    this.validationErrors$ = this.store.select(errorsSelector)
  }

  saveItem(): void {
    if (this.formValid) {
      this.store.dispatch(createMenuAction({menu: this.item}))
    }
  }

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onValidate(valid: boolean): void {
    this.formValid = valid
  }

  changeItem(value: IMenu): void {
    this.item = {...value, status: this.statusItem}
  }

  changeStatus(event: boolean): void {
    this.statusItem = event
  }
}
