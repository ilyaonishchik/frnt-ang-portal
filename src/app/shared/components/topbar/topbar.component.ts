import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {Observable} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {MenuItem, MessageService} from 'primeng/api'

import {LayoutService} from '../../services/layout.service'
import {AppService} from '../../services/app.service'
import {
  isAnonymousSelector,
  isSignedInSelector,
} from '../../../modules/auth/store/selectors'
import {signoutAction} from '../../../modules/auth/store/actions/signout.action'
import {AuthService} from '../../../modules/auth/services/auth.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  items!: MenuItem[]
  isSignedIn$!: Observable<boolean | null>
  isAnonymous$!: Observable<boolean>

  @ViewChild('menubutton') menuButton!: ElementRef

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef

  @ViewChild('topbarmenu') menu!: ElementRef

  constructor(
    private store: Store,
    public layoutService: LayoutService,
    public authService: AuthService,
    public messageService: MessageService,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.isSignedIn$ = this.store.pipe(select(isSignedInSelector))
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector))
  }

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
    this.store.dispatch(signoutAction())
    // this.authService.signOut()
  }
}
