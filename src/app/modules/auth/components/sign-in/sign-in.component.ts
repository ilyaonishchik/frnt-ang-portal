import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {Observable} from 'rxjs'

import {Store} from '@ngrx/store'

import {isSubmittingSelector} from '../../store/selectors'
import {ISigninRequest} from '../../interfaces/signin-request.interface'
import {signinAction} from '../../store/actions/signin.action'
import {environment} from 'environments/environment'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  projectTitle: string = environment.title
  signInForm!: FormGroup
  isSubmitting$!: Observable<boolean>

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  get f() {
    return this.signInForm.controls
  }

  private initializeForm(): void {
    this.signInForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false],
    })
  }

  private initializeValues(): void {
    this.isSubmitting$ = this.store.select(isSubmittingSelector)
  }

  resetForm(): void {
    this.signInForm.reset()
  }

  submitSignIn(): void {
    const request: ISigninRequest = this.signInForm.value
    this.store.dispatch(signinAction({request}))
  }
}
