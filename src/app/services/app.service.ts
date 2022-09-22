import {Injectable} from '@angular/core'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class AppService {
  projectTitle: string = environment.title
  isProduction: boolean = environment.production
  version: string = environment.version
  urlApiAuth: string = environment.urlApiAuth

  constructor() {}
}
