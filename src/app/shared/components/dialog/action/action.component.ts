import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'avs-dialog-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>()

  @Input('header') header: string = 'Информация о: '
  @Input('actionRead') actionRead: boolean = false

  @Input('status') status: number = 0
  @Output('statusChange') statusChange: EventEmitter<number> =
    new EventEmitter<number>()

  @Output('clickConfirm') onClickConfirm: EventEmitter<any> =
    new EventEmitter<any>()
  @Output('clickCancel') onClickCancel: EventEmitter<any> =
    new EventEmitter<any>()

  constructor() {}

  ngOnInit(): void {}

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }

  onStatusChange(value: number): void {
    this.status = value
    this.statusChange.emit(value)
  }

  hideDialog(): void {
    this.onClickCancel.emit()
  }

  saveItem(): void {
    this.onClickConfirm.emit()
  }
}
