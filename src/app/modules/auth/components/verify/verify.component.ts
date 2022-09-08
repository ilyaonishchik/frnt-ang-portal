import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AuthService} from '../../../../services/auth.service'
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  username!: string
  message!: string

  constructor(
    private activateRoute: ActivatedRoute,
    private appService: AppService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.verifyCode(this.activateRoute.snapshot.params['code'])
  }

  get appName() {
    return this.appService.projectTitle
  }

  verifyCode(code: string) {
    this.authService.verifyCode(code).subscribe({
      next: (res) => {
        this.username = res.username
      },
      error: (err) => {
        console.log(err.code)
        this.message = err.message
      },
      complete: () => {
        console.log('Complete verify')
      },
    })
  }
}
