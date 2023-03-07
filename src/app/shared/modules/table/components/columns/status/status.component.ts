import {Component, Input} from '@angular/core'

@Component({
  selector: 'avs-table-columns-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent {
  @Input() status: boolean | number | undefined
}
