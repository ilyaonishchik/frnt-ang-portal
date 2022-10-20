import {Component, Input, OnInit} from '@angular/core'
import {IBackendErrors} from 'src/app/shared/interfaces/backend-errors.interface'
import {Message, MessageService} from 'primeng/api'

@Component({
  selector: 'avs-message-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
  providers: [MessageService],
})
export class ValidateComponent implements OnInit {
  @Input('errors') errors: IBackendErrors | null = null
  messages: Message[] = []

  constructor() {}

  ngOnInit(): void {
    if (this.errors) {
      for (const key in this.errors) {
        if (key === '_') {
          this.messages.push({
            severity: 'warn',
            summary: 'Внимание',
            detail: this.errors[key].toString(),
          })
        } else {
          this.messages.push({
            severity: 'error',
            summary: 'Ошибка',
            detail: `Field [${key}]: ${this.errors[key].toString()}`,
          })
        }
      }
    }
  }
}
