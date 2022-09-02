import {Component, OnInit} from '@angular/core'
import {Location} from '@angular/common'
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit {
  constructor(public appService: AppService, private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back()
  }
}
