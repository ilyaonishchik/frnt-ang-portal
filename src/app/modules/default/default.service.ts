import {Injectable} from '@angular/core'
import {ModuleInterface} from './module.interface'

@Injectable({
  providedIn: 'root',
})
export class DefaultService {
  modules: ModuleInterface[] = [
    {
      name: 'Сортировка подписки',
      description: 'Сортировка печатных СМИ выписанных подписчиками',
      link: '/sorting/pdp',
      status: true,
    },
    {
      name: 'Сортировка ПСМИ',
      description: 'Сортировка печатных СМИ поступивших в розницу',
      link: '/sorting/rzn',
      status: true,
    },
  ]

  constructor() {}

  getModules() {
    return this.modules
  }
}
