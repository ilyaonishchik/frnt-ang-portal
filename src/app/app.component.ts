import {Component, OnDestroy, OnInit} from '@angular/core'
import {MessageService, PrimeNGConfig} from 'primeng/api'
import {EventBusService} from './services/event-bus.service'
import {Subscription} from 'rxjs'
import {AuthService} from './services/auth.service'
import {Store} from '@ngrx/store'
import {signoutAction} from './modules/auth/store/actions/signout.action'
import {getCurrentUserAction} from './modules/auth/store/actions/get-current-user.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventBusSub!: Subscription
  constructor(
    private store: Store,
    private primeConfig: PrimeNGConfig,
    private eventBusService: EventBusService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    console.log('AppComponent ngOnInit')
    this.initializeConfig()
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
    console.log('AppComponent ngOnInit getCurrentUserAction')
    this.store.dispatch(getCurrentUserAction())
  }

  initializeConfig(): void {
    document.documentElement.style.fontSize = '15px'
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
    })
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) this.eventBusSub.unsubscribe()
  }
}
