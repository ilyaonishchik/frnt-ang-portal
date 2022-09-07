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
  providers: [MessageService],
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
    console.log(this.signUpForm)
    // this.authService.signUp(this.signUpForm.value).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //     this.messageService.add({
    //       key: 'sign-up',
    //       severity: 'success',
    //       summary: 'Внимание',
    //       detail: `Заявка на регистрацию пользователя: ${res.name} принята.`,
    //     })
    //     // this.authService.setToken(res.access_token)
    //     // this.authService.redirect()
    //   },
    //   error: (err) => {
    //     console.warn(err)
    //     this.messageService.add({
    //       key: 'sign-up',
    //       severity: 'warn',
    //       summary: 'Внимание',
    //       detail: err,
    //     })
    //   },
    //   complete: () => {
    //     console.log('Complete sign-up')
    //   },
    // })
  }

  resetForm() {
    this.signUpForm.reset()
  }
}
