import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Store} from '@ngrx/store'
import {Observable} from 'rxjs'

import {signupAction} from '../../store/actions/signup.action'
import {isSubmittingSelector} from '../../store/selectors'
import {AuthService} from '../../services/auth.service'
import {ISignupRequest} from '../../interfaces/signup-request.interface'
import {environment} from 'environments/environment'
import {CustomValidators} from '@shared/validators/custom'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isSubmitting$!: Observable<boolean>

  projectTitle: string = environment.title
  signUpForm!: FormGroup

  constructor(
    private store: Store,
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeSubscriptions()
    this.initializeForm()
  }

  private initializeForm(): void {
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
        email: [null, [Validators.email]],
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

  private initializeSubscriptions(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
  }

  submitSignUp(): void {
    if (this.signUpForm.value.email === '') {
      this.signUpForm.value.email = null
    }
    const request: ISignupRequest = this.signUpForm.value
    this.store.dispatch(signupAction({request: request}))
  }

  resetForm(): void {
    this.signUpForm.reset()
  }

  get f() {
    return this.signUpForm.controls
  }
}
