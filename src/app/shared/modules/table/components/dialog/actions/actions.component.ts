import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'avs-table-dialog-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange: EventEmitter<boolean> =
    new EventEmitter<boolean>()
  constructor() {}

  ngOnInit(): void {}

  onVisibleChange(value: boolean): void {
    this.visible = value
    this.visibleChange.emit(value)
  }
}
