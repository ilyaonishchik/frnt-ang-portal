import {Injectable} from '@angular/core'
import {Message, MessageService} from 'primeng/api'
import {IBackendErrors} from '../interfaces/backend-errors.interface'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  showBackendErrors(payload: IBackendErrors): void {
    const msg: Message = {key: 'main', severity: 'error', summary: 'Ошибка'}

    for (const key in payload) {
      if (key === '_') {
        msg.detail = payload[key].toString()
      } else {
        msg.detail = `${key}: ${payload[key]}`
      }
    }
    this.messageService.add(msg)
  }

  showError(payload: string): void {
    const msg: Message = {key: 'main', severity: 'error', summary: 'Ошибка'}
    msg.detail = payload
    this.messageService.add(msg)
  }

  showWarn(payload: string): void {
    const msg: Message = {key: 'main', severity: 'warn', summary: 'Внимание'}
    msg.detail = payload
    this.messageService.add(msg)
  }
}
