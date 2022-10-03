import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {AppService} from '../../../../shared/services/app.service'
import {CustomValidators} from '../../../../shared/validators'
import {signupAction} from '../../store/actions/signup.action'
import {isSubmittingSelector} from '../../store/selectors'
import {AuthService} from '../../services/auth.service'
import {ISignupRequest} from '../../types/signup-request.interface'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup
  isSubmitting$!: Observable<boolean>

  constructor(
    private store: Store,
    public appService: AppService,
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeForm(): void {
    this.signUpForm = this.formBuilder.group(
      {
        username: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        password2: [null, [Validators.required]],
      },
      {
        validators: [CustomValidators.mustMatch('password', 'password2')],
      }
    )
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

  get f() {
    return this.signUpForm.controls
  }

  submitSignUp() {
    const request: ISignupRequest = this.signUpForm.value
    this.store.dispatch(signupAction({request}))
  }

  resetForm() {
    this.signUpForm.reset()
  }
}
