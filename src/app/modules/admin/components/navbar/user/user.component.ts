import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {AuthService} from '../../../../auth/services/auth.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any

  constructor(private authService: AuthService, libraryIcons: FaIconLibrary) {
    libraryIcons.addIcons(faRightFromBracket)
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout()
  }
}
