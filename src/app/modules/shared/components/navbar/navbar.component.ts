import {Component, OnInit} from '@angular/core'
import {AppService} from '../../../../services/app.service'
import {AuthService} from '../../../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed: boolean = true
  isUserSigned: boolean = false
  constructor(
    private appService: AppService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isUserSigned = this.authService.state.userSignedIn
  }

  getProjectTitle() {
    return this.appService.projectTitle
  }
}
