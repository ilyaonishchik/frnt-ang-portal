import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {MenuItem, MessageService} from 'primeng/api'
import {LayoutService} from './service/app.layout.service'
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-topbar',
  styles: [
    `
      :host ::ng-deep .layout-topbar .layout-topbar-button i span {
        font-size: 0.75rem;
      }
    `,
  ],
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[]

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    public messageService: MessageService
  ) {}

  ngOnInit() {}

  showNotifications() {
    this.messageService.add({
      key: 'main',
      severity: 'info',
      summary: 'Внимание',
      detail: 'Нет новых уведомлений',
    })
  }

  showMessages() {
    this.messageService.add({
      key: 'main',
      severity: 'info',
      summary: 'Внимание',
      detail: 'Нет новых сообщений',
    })
  }

  logout() {
    this.authService.signOut()
  }
}
