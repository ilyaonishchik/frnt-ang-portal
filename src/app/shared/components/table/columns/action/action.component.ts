import {Component, EventEmitter, OnInit, Output} from '@angular/core'

@Component({
  selector: 'avs-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
})
export class ActionComponent implements OnInit {
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
