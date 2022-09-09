import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {MenuItem, MessageService} from 'primeng/api'
import {LayoutService} from '../../../../services/layout.service'
import {AuthService} from '../../../../services/auth.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  items!: MenuItem[]

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef

  constructor(
    public layoutService: LayoutService,
    public authService: AuthService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {}

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
