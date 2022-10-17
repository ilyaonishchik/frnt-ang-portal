import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'avs-columns-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
  @Input('status') value: boolean | number | undefined

  constructor() {}

  ngOnInit(): void {}
}
