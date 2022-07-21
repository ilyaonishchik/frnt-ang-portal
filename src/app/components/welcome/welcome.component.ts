import {Component, OnInit} from '@angular/core'
import {WelcomeService} from './service/welcome.service'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import {AppService} from '../../services/app.service'
import {AuthService} from '../../modules/auth/services/auth.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private welcomeService: WelcomeService,
    private appService: AppService,
    private authService: AuthService,
    libraryIcons: FaIconLibrary
  ) {
    libraryIcons.addIcons(faRightToBracket, faUserPlus, faRightFromBracket)
  }

  ngOnInit(): void {}

  isSignIn() {
    return this.authService.isSignIn()
  }

  logout() {
    this.authService.deleteToken()
  }

  isProduction() {
    return this.appService.isProduction
  }

  getProjectTitle() {
    return this.appService.projectTitle
  }

  getLinks() {
    return this.welcomeService.getLinks()
  }

  showLink(link: string) {
    window.open(link, '_blank')
  }
}
