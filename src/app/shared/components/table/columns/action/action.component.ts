import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IItemCRUD} from 'src/app/shared/interfaces/rbac.interface'

@Component({
  selector: 'avs-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  @Input('userCRUD') crud: IItemCRUD | null = null
  @Output('clickRead') onClickRead: EventEmitter<any> = new EventEmitter<any>()
  @Output('clickUpdate') onClickEdit: EventEmitter<any> =
    new EventEmitter<any>()
  @Output('clickDelete') onClickDelete: EventEmitter<any> =
    new EventEmitter<any>()

  constructor() {}

  ngOnInit(): void {}

  clickRead() {
    this.onClickRead.emit()
  }
  clickEdit() {
    this.onClickEdit.emit()
  }
  clickDelete() {
    this.onClickDelete.emit()
  }
}
