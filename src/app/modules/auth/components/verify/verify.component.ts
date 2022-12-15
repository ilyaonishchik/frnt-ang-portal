import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

import {AuthService} from '../../services/auth.service'
import {IVerifyResponse} from '../../interfaces/verify-response.interface'
import {environment} from 'environments/environment'

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  projectTitle: string = environment.title
  username!: string
  message!: string

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.verifyCode(this.activateRoute.snapshot.params['code'])
  }

  verifyCode(code: string) {
    this.authService.verifyCode(code).subscribe({
      next: (response: IVerifyResponse) => {
        this.username = response.username
      },
      error: (err) => {
        switch (err.status) {
          case 400: {
            this.message = err.error.message
            break
          }
          default: {
            this.message = err.message
          }
        }
      },
      complete: () => {
        console.log('Complete verify')
      },
    })
  }
}
