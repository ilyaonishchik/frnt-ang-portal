import {Component, OnInit} from '@angular/core'
import {AppService} from '../../../../services/app.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../../../services/auth.service'
import {MessageService} from 'primeng/api'

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers: [MessageService],
})
export class PasswordResetComponent implements OnInit {
  resetPasswordForm!: FormGroup

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
    return this.resetPasswordForm.controls
  }
  makeForm() {
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    })
  }

  resetForm() {
    this.resetPasswordForm.reset()
  }

  submitReset() {
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res)
        // this.authService.setToken(res.access_token)
        // this.authService.setUserInfo(res.user)
        // this.authService.redirect()
        //       // this.messageService.add({
        //       //   key: 'sign-in',
        //       //   severity: 'success',
        //       //   summary: 'Успешная авторизация',
        //       //   detail: `Приветствуем вас: ${res.user.name}!`,
        //       // })
      },
      error: (err) => {
        console.warn(err.code)
        this.messageService.add({
          key: 'reset',
          severity: 'warn',
          summary: 'Внимание',
          detail: err.message,
        })
        this.resetForm()
      },
      complete: () => {
        console.log('Complete reset password')
      },
    })
  }
}
