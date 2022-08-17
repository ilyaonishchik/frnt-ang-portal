import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap'

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '.'

  override fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER)
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      }
    }
    return null
  }

  override toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.day.toString().padStart(2, '0') +
          this.DELIMITER +
          date.month.toString().padStart(2, '0') +
          this.DELIMITER +
          date.year
      : null
  }
}

@Injectable()
export class CustomDateParseFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '.'

  override parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER)
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      }
    }
    return null
  }

  override format(date: NgbDateStruct | null): string {
    return date
      ? date.day.toString().padStart(2, '0') +
          this.DELIMITER +
          date.month.toString().padStart(2, '0') +
          this.DELIMITER +
          date.year
      : ''
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParseFormatter},
  ],
})
export class DatepickerComponent implements OnInit {
  @Input() valueDate: string | undefined
  @Output() changed = new EventEmitter<string>()

  constructor() {}

  ngOnInit(): void {}

  change() {
    this.changed.emit(this.valueDate)
  }
}
