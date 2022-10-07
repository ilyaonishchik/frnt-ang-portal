import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IItemCRUD} from '../../../../types/rbac.interface'

@Component({
  selector: 'avs-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  @Input('userCRUD') crud: IItemCRUD | null = null
  @Output('clickView') onClickView: EventEmitter<any> = new EventEmitter<any>()
  @Output('clickEdit') onClickEdit: EventEmitter<any> = new EventEmitter<any>()
  @Output('clickDelete') onClickDelete: EventEmitter<any> =
    new EventEmitter<any>()

  constructor() {}

  ngOnInit(): void {}

  clickView() {
    this.onClickView.emit()
  }
  clickEdit() {
    this.onClickEdit.emit()
  }
  clickDelete() {
    this.onClickDelete.emit()
  }
}
