import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'
import {NgbDate} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  valueDate!: NgbDate
  // @Input() dateValue: string = ''
  @Input()
  set dateValue(dateValue: string) {
    const dateParts = dateValue.split('.')
    this.valueDate = new NgbDate(
      parseInt(dateParts[2]),
      parseInt(dateParts[1]),
      parseInt(dateParts[0])
    )
  }

  @Output() changed = new EventEmitter<string>()

  constructor() {}

  ngOnInit(): void {}

  get dateValue(): string {
    return `${this.valueDate.day
      .toString()
      .padStart(2, '0')}.${this.valueDate.month
      .toString()
      .padStart(2, '0')}.${this.valueDate.year.toString()}`
  }

  change(value: string) {
    console.log(`Picker: ${value}`)
    this.changed.emit(value)
  }
}
