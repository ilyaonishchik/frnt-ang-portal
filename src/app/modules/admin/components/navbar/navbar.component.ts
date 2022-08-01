import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'

import {AppService} from '../../../../services/app.service'
import {AuthService} from '../../../auth/services/auth.service'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true
  constructor(
    private appService: AppService,
    private authService: AuthService,
    libraryIcons: FaIconLibrary
  ) {
    libraryIcons.addIcons(faRightFromBracket)
  }

  ngOnInit(): void {}

  getProjectTitle() {
    return this.appService.projectTitle
  }

  logout() {
    this.authService.logout()
  }
}
