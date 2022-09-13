import {Injectable} from '@angular/core'
import {filter, map, Subject, Subscription} from 'rxjs'

import {IEvent} from '../types/event'

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject<IEvent>()

  constructor() {}

  emit(event: IEvent) {
    // console.log('Emit event: %s', event)
    this.subject$.next(event)
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: IEvent) => e.name === eventName),
        map((e: IEvent) => e['value'])
      )
      .subscribe(action)
  }
}
