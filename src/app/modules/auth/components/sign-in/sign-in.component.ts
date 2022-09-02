import {Component, OnInit} from '@angular/core'

import {MessageService} from 'primeng/api'

import {AuthService} from '../../../../services/auth.service'
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [MessageService],
})
export class SignInComponent implements OnInit {
  valCheck: string[] = ['remember']

  username!: string
  password!: string

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // this.loginForm = this.fb.group({
    //   username: ['', [Validators.required, Validators.minLength(3)]],
    //   password: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
    //     ],
    //   ],
    // })
  }

  submitLogin() {
    this.authService
      .signIn({username: this.username, password: this.password})
      .subscribe({
        next: (res) => {
          console.log(res.access_token)
          this.authService.setToken(res.access_token)
          this.authService.redirect()
        },
        error: (err) => {
          console.warn(err)
          // this.loginForm.setErrors([err])
          this.messageService.add({
            key: 'sign-in',
            severity: 'warn',
            summary: 'Внимание',
            detail: err,
          })
        },
        complete: () => {
          console.log('Complete login')
        },
      })
  }
}
