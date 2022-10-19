import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {IItemCRUD} from '../../../../../interfaces/rbac.interface'

@Component({
  selector: 'avs-table-columns-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input('userCRUD') crud: IItemCRUD | null = null
  @Output('clickRead') onClickRead = new EventEmitter<any>()
  @Output('clickUpdate') onClickEdit = new EventEmitter<any>()
  @Output('clickDelete') onClickDelete = new EventEmitter<any>()

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
