import {Component, OnInit} from '@angular/core'
import {PrimeNGConfig} from 'primeng/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private primeConfig: PrimeNGConfig) {}

  ngOnInit() {
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
}
