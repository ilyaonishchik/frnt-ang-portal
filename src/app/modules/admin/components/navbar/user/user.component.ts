import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {
  faRightFromBracket,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'
import {Observable} from 'rxjs'

import {AuthService} from '../../../../auth/services/auth.service'
import {UserInterface} from '../../../../../types/user'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser!: UserInterface

  constructor(private authService: AuthService, libraryIcons: FaIconLibrary) {
    libraryIcons.addIcons(faRightFromBracket, faUserCircle)
  }

  ngOnInit(): void {
    // this.currentUser = this.authService.getUserById(1)
    this.authService.getUserById(4).subscribe({
      next: (res) => {
        this.currentUser = res
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => {
        console.log('Complete login')
      },
    })

    console.log(this.currentUser)
  }

  logout() {
    this.authService.logout()
  }
}
