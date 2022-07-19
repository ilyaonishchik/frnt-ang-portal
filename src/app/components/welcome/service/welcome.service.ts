import {Injectable} from '@angular/core'
import {environment} from '../../../../environments/environment'
import {LinkInterface} from '../types/link.interface'

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
  projectTitle: string = environment.title
  isProduction: boolean = environment.production

  links: LinkInterface[] = [
    {name: 'ПТКС РПО', website: 'http://tracksys.belpost.by/belpost'},
    {name: 'ПТКС РПО 1', website: 'http://172.16.100.26/belpost'},
    {name: 'ПТКС РПО 2', website: 'http://172.16.100.27/belpost'},
  ]

  constructor() {}

  getLinks() {
    return this.links
  }
}
