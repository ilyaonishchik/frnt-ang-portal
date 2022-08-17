import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {
  faRightFromBracket,
  faUser,
  faUserGear,
} from '@fortawesome/free-solid-svg-icons'
import {AuthService} from '../../../../../services/auth.service'
import {UserInterface} from '../../../../../types/user'
import {Router} from '@angular/router'
// import {Observable} from 'rxjs'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  currentUser: UserInterface

  constructor(
    private authService: AuthService,
    private router: Router,
    libraryIcons: FaIconLibrary
  ) {
    libraryIcons.addIcons(faRightFromBracket, faUser, faUserGear)
    this.currentUser = this.authService.getTestUser()
  }

  ngOnInit(): void {
    // this.currentUser = this.authService.getUserById(1)
    // this.authService.getUserById(3).subscribe({
    //   next: (res) => {
    //     this.currentUser = res
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   },
    //   complete: () => {
    //     console.log('Complete login')
    //   },
    // })
  }

  gotoLink(link: string) {
    this.router.navigate([link])
  }

  logout() {
    this.authService.logout()
  }
}
