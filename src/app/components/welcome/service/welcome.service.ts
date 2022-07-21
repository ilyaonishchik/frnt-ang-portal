import {Injectable} from '@angular/core'
import {LinkInterface} from '../types/link.interface'

@Injectable({
  providedIn: 'root',
})
export class WelcomeService {
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
