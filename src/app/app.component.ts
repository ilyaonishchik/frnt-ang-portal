import {Component, OnDestroy, OnInit} from '@angular/core'
import {Observable, Subscription} from 'rxjs'

import {select, Store} from '@ngrx/store'

import {MessageService, PrimeNGConfig} from 'primeng/api'

import {EventBusService} from './shared/services/event-bus.service'
import {signoutAction} from './modules/auth/store/actions/signout.action'
import {getCurrentUserAction} from './modules/auth/store/actions/get-current-user.action'
import {
  currentUserSelector,
  validationErrorSelector,
} from './modules/auth/store/selectors'
import {ICurrentUser} from './shared/interfaces/current-user.interface'
import {AppService} from './shared/services/app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventBusSub!: Subscription
  backendError!: Subscription
  currentUser$!: Observable<ICurrentUser | null>

  constructor(
    private store: Store,
    private primeConfig: PrimeNGConfig,
    private eventBusService: EventBusService,
    private messageService: MessageService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.initializeConfig()
    this.initializeState()
    this.initializeEvents()
  }

  initializeConfig(): void {
    document.documentElement.style.fontSize = '14px'
    this.primeConfig.ripple = false
    this.primeConfig.setTranslation({
      passwordPrompt: 'Введите пароль',
      weak: 'Легкий',
      medium: 'Средний',
      strong: 'Сложный',

      dateFormat: 'dd.mm.yy',
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      monthNamesShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
      ],
      dayNames: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
      ],
      dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      firstDayOfWeek: 1,
      today: 'Сегодня',
      clear: 'Очистить',
      emptyMessage: 'Нет данных',
      emptyFilterMessage: 'Нет данных',
    })
  }

  initializeState(): void {
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
    this.store.dispatch(getCurrentUserAction())
  }

  initializeEvents(): void {
    this.eventBusSub = this.eventBusService.on('signout', () => {
      this.messageService.add({
        key: 'main',
        severity: 'warn',
        summary: 'Внимание',
        detail:
          'Ваш сеанс завершен принудительно в связи с окончанием времени сессии.',
      })
      this.store.dispatch(signoutAction())
    })
    this.backendError = this.store
      .pipe(select(validationErrorSelector))
      .subscribe((value) => {
        this.appService.showBackendError(value)
      })
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) this.eventBusSub.unsubscribe()
  }
}
