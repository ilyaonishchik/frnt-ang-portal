import {Component} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {MessageService} from 'primeng/api'

import {AuthService} from '../../services/auth.service'
import {environment} from 'environments/environment'

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  projectTitle: string = environment.title
  resetPasswordForm!: FormGroup

  constructor(
    public authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.makeForm()
  }

  get f() {
    return this.resetPasswordForm.controls
  }
  makeForm(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    })
  }

  resetForm(): void {
    this.resetPasswordForm.reset()
  }

  submitReset(): void {
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
        //   this.messageService.add({
        //     key: 'main',
        //     severity: 'warn',
        //     summary: 'Внимание',
        //     detail: err.message,
        //   })
        //   this.resetForm()
      },
      complete: () => {
        //   this.resetForm()
        console.log('Complete reset password')
      },
    })
  }
}
