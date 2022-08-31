import {Component, OnDestroy, OnInit} from '@angular/core'
// import {AppService} from '../../../../services/app.service'
// import {FormBuilder, FormGroup, Validators} from '@angular/forms'
// import {Router} from '@angular/router'

// import {ToastService} from '../../../../services/toast.service'
// import {AuthService} from '../../../../services/auth.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  valCheck: string[] = ['remember']

  password!: string

  // loginForm!: FormGroup
  constructor() // private router: Router, // private fb: FormBuilder,
  // private appService: AppService,
  // private authService: AuthService,
  // public toastService: ToastService
  {}

  ngOnInit(): void {
    // if (this.authService.isSignIn()) {
    //   this.router.navigate(['/'])
    // }
    // this.loginForm = this.fb.group({
    //   username: ['', [Validators.required, Validators.minLength(3)]],
    //   password: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
    //     ],
    //   ],
    // })
  }

  submitLogin() {
    // this.authService.signIn(this.loginForm.value).subscribe({
    //   next: (res) => {
    //     console.log(res.access_token)
    //     this.authService.setToken(res.access_token)
    //     this.router.navigate(['/'])
    //   },
    //   error: (err) => {
    //     console.error(err)
    //     this.toastService.showError(err)
    //     // this.loginForm.setErrors([err])
    //   },
    //   complete: () => {
    //     console.log('Complete login')
    //   },
    // })
  }

  getProjectTitle() {
    // return this.appService.projectTitle
  }

  ngOnDestroy(): void {
    // this.toastService.clear()
  }
}
