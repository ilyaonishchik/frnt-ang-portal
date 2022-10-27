import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'avs-table-dialog-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>()
  @Input('itemInfo') itemInfo: string | number | undefined = undefined
  @Output('clickConfirm') onClickConfirm = new EventEmitter<any>()
  @Output('clickCancel') onClickCancel = new EventEmitter<any>()

  constructor() {}

  ngOnInit(): void {}

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  confirmDelete(): void {
    this.onClickConfirm.emit()
  }

  cancelDelete(): void {
    this.onClickCancel.emit()
  }
}
