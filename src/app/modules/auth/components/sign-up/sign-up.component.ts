import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {MessageService} from 'primeng/api'

import {AppService} from '../../../../services/app.service'
import {AuthService} from '../../../../services/auth.service'

import {MustMatch} from '../../../../shared/validators'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.makeForm()
  }

  ngOnInit(): void {}

  makeForm() {
    this.signUpForm = this.formBuilder.group(
      {
        username: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        password2: [null, [Validators.required]],
      },
      {
        validator: MustMatch('password', 'password2'),
      }
    )
  }

  get f() {
    return this.signUpForm.controls
  }

  submitSignUp() {
    this.authService.signUp(this.signUpForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          key: 'main',
          severity: 'success',
          summary: 'Внимание',
          detail: `Заявка на регистрацию пользователя: ${res.username} принята.`,
        })
      },
      error: (err) => {
        console.warn(err.code)
        this.messageService.add({
          key: 'main',
          severity: 'warn',
          summary: 'Внимание',
          detail: err.message,
        })
      },
      complete: () => {
        this.resetForm()
        console.log('Complete sign-up')
        this.authService.redirect()
      },
    })
  }

  resetForm() {
    this.signUpForm.reset()
  }
}
