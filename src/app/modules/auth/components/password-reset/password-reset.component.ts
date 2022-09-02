import {Component, OnInit} from '@angular/core'
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit(): void {}
}
