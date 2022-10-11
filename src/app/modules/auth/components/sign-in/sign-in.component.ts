import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable} from 'rxjs'

import {select, Store} from '@ngrx/store'

import {AppService} from '../../../../shared/services/app.service'
import {isSubmittingSelector} from '../../store/selectors'
import {ISigninRequest} from '../../interfaces/signin-request.interface'
import {signinAction} from '../../store/actions/signin.action'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup
  isSubmitting$!: Observable<boolean>

  constructor(
    private store: Store,
    public appService: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  get f() {
    return this.signInForm.controls
  }

  initializeForm(): void {
    this.signInForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    })
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  resetForm() {
    this.signInForm.reset()
  }

  submitSignIn() {
    const request: ISigninRequest = this.signInForm.value
    this.store.dispatch(signinAction({request}))

    // this.authService.signIn(this.signInForm.value).subscribe({
    //   next: () => {
    //     this.authService.getUserMeInfo()
    //     this.authService.redirect()
    //   },
    //   error: (err) => {
    //     console.warn('SignIn error (%s): %s', err.code, err.message)
    //     this.messageService.add({
    //       key: 'main',
    //       severity: 'warn',
    //       summary: 'Внимание',
    //       detail: err.message,
    //     })
    //   },
    //   complete: () => {
    //     console.log('SignIn: Complete')
    //   },
    // })
    // this.resetForm()
  }
}
