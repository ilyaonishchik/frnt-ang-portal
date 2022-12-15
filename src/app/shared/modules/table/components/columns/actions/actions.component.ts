import {Component, EventEmitter, Input, Output} from '@angular/core'
import {IItemCRUD} from '@shared/interfaces/rbac.interface'

@Component({
  selector: 'avs-table-columns-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  @Input() crud: IItemCRUD | null = null
  @Output() clickRead = new EventEmitter<MouseEvent>()
  @Output() clickUpdate = new EventEmitter<MouseEvent>()
  @Output() clickDelete = new EventEmitter<MouseEvent>()

  onClickRead(event: MouseEvent) {
    this.clickRead.emit(event)
  }

  onClickUpdate(event: MouseEvent) {
    this.clickUpdate.emit(event)
  }

  onClickDelete(event: MouseEvent) {
    this.clickDelete.emit(event)
  }
}
