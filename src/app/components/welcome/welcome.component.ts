import {Component, OnInit} from '@angular/core'
import {WelcomeService} from './service/welcome.service'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(
    private welcomeService: WelcomeService,
    libraryIcons: FaIconLibrary
  ) {
    libraryIcons.addIcons(faRightToBracket, faUserPlus, faRightFromBracket)
  }

  ngOnInit(): void {}

  isSignIn() {
    return false
  }

  logout() {}

  isProduction() {
    return this.welcomeService.isProduction
  }

  getProjectTitle() {
    return this.welcomeService.projectTitle
  }

  getLinks() {
    return this.welcomeService.getLinks()
  }

  showLink(link: string) {
    window.open(link, '_blank')
  }
}
