import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {MenuItem, MessageService} from 'primeng/api'
import {LayoutService} from '../../../../services/layout.service'
import {AuthService} from '../../../../services/auth.service'
import {EventBusService} from '../../../../services/event-bus.service'

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
    public messageService: MessageService,
    private eventBusService: EventBusService
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

  showUserInfo() {
    let user: string = ''
    this.authService.getUserMeInfo().subscribe({
      next: (res) => {
        user = JSON.stringify(res)
        console.log('showUserInfo next: %s', user)
        this.messageService.add({
          key: 'main',
          severity: 'info',
          summary: 'Информация',
          detail: user,
        })
      },
      error: (err) => {
        console.log(err)
        this.eventBusService.emit({name: 'signout', value: null})

        // this.messageService.add({
        //   key: 'main',
        //   severity: 'warn',
        //   summary: 'Внимание',
        //   detail: err.message,
        // })
      },
    })
  }

  logout() {
    this.authService.signOut()
  }
}
