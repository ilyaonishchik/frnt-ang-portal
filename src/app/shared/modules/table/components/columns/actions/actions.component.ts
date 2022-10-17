import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IItemCRUD} from '../../../../../interfaces/rbac.interface'

@Component({
  selector: 'avs-columns-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input('userCRUD') crud: IItemCRUD | null = null
  @Output('clickRead') onClickRead: EventEmitter<any> = new EventEmitter<any>()
  @Output('clickUpdate') onClickEdit: EventEmitter<any> =
    new EventEmitter<any>()
  @Output('clickDelete') onClickDelete: EventEmitter<any> =
    new EventEmitter<any>()

  constructor() {}

  ngOnInit(): void {}

  clickRead(event: any) {
    this.onClickRead.emit(event)
  }

  clickEdit(event: any) {
    this.onClickEdit.emit(event)
  }

  clickDelete(event: any) {
    this.onClickDelete.emit(event)
  }
}
