import {Injectable} from '@angular/core'
import {environment} from '../../../environments/environment'
import {MessageService} from 'primeng/api'
import {IBackendError} from '../types/backend-errors.interface'
import {ICurrentUser} from '../types/current-user.interface'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  projectTitle: string = environment.title
  isProduction: boolean = environment.production
  version: string = environment.version
  urlApiAuth: string = environment.urlApiAuth
  urlApiPdp: string = environment.urlApiPdp

  constructor(private messageService: MessageService) {}

  showBackendError(error: IBackendError | null): void {
    if (error) {
      this.messageService.add({
        key: 'main',
        severity: 'warn',
        summary: 'Внимание',
        detail: error.message,
      })
    }
  }

  showSignupSuccess(user: ICurrentUser | null): void {
    if (user) {
      this.messageService.add({
        key: 'main',
        severity: 'success',
        summary: 'Информация',
        detail: `Уважаемый ${user.username}, на Ваш электронный адрес ${user.email} отправлена инструкция по активации аккаунта`,
      })
    }
  }
}
