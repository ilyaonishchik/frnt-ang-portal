import {Component, OnInit} from '@angular/core'
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  password1!: string
  password2!: string

  constructor(public appService: AppService) {}

  ngOnInit(): void {}
}
