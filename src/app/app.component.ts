import {Component, OnDestroy, OnInit} from '@angular/core'
import {ToastService} from './services/toast.service'
import {PrimeNGConfig} from 'primeng/api'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'portal'

  constructor(
    public toastService: ToastService,
    private primeConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primeConfig.ripple = true
    document.documentElement.style.fontSize = '15px'
    this.primeConfig.setTranslation({
      passwordPrompt: 'Введите пароль',
      weak: 'Легкий',
      medium: 'Средний',
      strong: 'Сложный',

      dateFormat: 'dd.mm.yy',
      // monthNames: ['',],
      // monthNamesShort: [''],
    })
  }

  ngOnDestroy(): void {
    this.toastService.clear()
  }
}
