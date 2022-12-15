import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'
import {IMenu} from '../../../../sections/portal/menus/interfaces/menu.interface'
import {errorsSelector} from '../../store/selectors'
import {createMenuAction} from '../../store/actions/menu.action'

@Component({
  selector: 'app-menu-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() visible = false
  @Output() visibleChange = new EventEmitter<boolean>()

  item: IMenu
  validationErrors$!: Observable<IBackendErrors | null>
  formValid = false
  statusItem = true

  constructor(private store: Store) {
    this.item = {
      id: 0,
      parent: 0,
      type: 1,
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

  ngOnInit(): void {
    this.initializeValues()
  }

  private initializeValues(): void {
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
