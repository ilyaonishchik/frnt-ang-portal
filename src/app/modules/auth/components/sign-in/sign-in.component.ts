import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

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
  signInForm!: FormGroup

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.makeForm()
  }

  ngOnInit(): void {}

  get f() {
    return this.signInForm.controls
  }

  makeForm() {
    this.signInForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    })
  }

  resetForm() {
    this.signInForm.reset()
  }

  submitLogin() {
    this.authService.signIn(this.signInForm.value).subscribe({
      next: (res) => {
        this.authService.setToken(res.access_token)
        this.authService.setUserInfo(res.user)
        this.authService.redirect()
        //       // this.messageService.add({
        //       //   key: 'sign-in',
        //       //   severity: 'success',
        //       //   summary: 'Успешная авторизация',
        //       //   detail: `Приветствуем вас: ${res.user.name}!`,
        //       // })
      },
      error: (err) => {
        console.warn(err)
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
