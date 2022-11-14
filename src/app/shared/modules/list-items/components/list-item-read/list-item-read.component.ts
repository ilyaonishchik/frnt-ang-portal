import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'avs-list-item-read',
  templateUrl: './list-item-read.component.html',
  styleUrls: ['./list-item-read.component.scss'],
})
export class ListItemReadComponent implements OnInit {
  @Input('visible') visible: boolean = false
  @Output('visibleChange') visibleChange = new EventEmitter<boolean>()

  @Input('itemId') itemId: number | undefined
  @Input('isLoading') isLoading: boolean = false

  constructor() {}

  ngOnInit(): void {}

  onVisibleChange(event: any): void {}
}
