import {Component, OnInit} from '@angular/core'
import {AppService} from '../../../../services/app.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appService: AppService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/),
        ],
      ],
    })
  }

  submitLogin() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res.access_token)
        this.authService.setToken(res.access_token)
        this.router.navigate(['welcome'])
      },
      error: (err) => {
        console.log(err.error.message)
      },
    })
  }

  getProjectTitle() {
    return this.appService.projectTitle
  }
}
