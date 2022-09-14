import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

import {MessageService} from 'primeng/api'

import {AppService} from '../../../../services/app.service'
import {AuthService} from '../../../../services/auth.service'
import {StorageService} from '../../../../services/storage.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private storageService: StorageService,
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

  submitSignIn() {
    this.authService.signIn(this.signInForm.value).subscribe({
      next: () => {
        this.authService.redirect()
      },
      error: (err) => {
        console.warn('SignIn error (%s): %s', err.code, err.message)
        this.messageService.add({
          key: 'main',
          severity: 'warn',
          summary: 'Внимание',
          detail: err.message,
        })
      },
      complete: () => {
        console.log('SignIn: Complete')
      },
    })
    this.resetForm()
  }
}
