import {Component, Input, OnInit} from '@angular/core'
import {Message} from 'primeng/api'

import {IBackendErrors} from '@shared/interfaces/backend-errors.interface'

@Component({
  selector: 'app-validate-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  @Input() errors: IBackendErrors | null = null
  messages: Message[] = []

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
