import {Component, OnInit} from '@angular/core'
import {Store} from '@ngrx/store'

import {PrimeNGConfig} from 'primeng/api'

import {getCurrentUserAction} from '@modules/auth/store/actions/get-current-user.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig, private store: Store) {}

  ngOnInit() {
    this.initializeConfig()
    this.initializeState()
  }

  initializeConfig(): void {
    document.documentElement.style.fontSize = '14px'
    this.primengConfig.ripple = false
    this.primengConfig.setTranslation({
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
      choose: 'Обзор...',
      upload: 'Загрузить',
      cancel: 'Отмена',
    })
  }

  initializeState(): void {
    this.store.dispatch(getCurrentUserAction())
  }
}
