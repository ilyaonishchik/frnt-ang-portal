import {Injectable} from '@angular/core'
import {environment} from '../../environments/environment'
import {MessageService} from 'primeng/api'
import {IBackendError} from '../shared/types/backend-errors.interface'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  projectTitle: string = environment.title
  isProduction: boolean = environment.production
  version: string = environment.version
  urlApiAuth: string = environment.urlApiAuth

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
}
