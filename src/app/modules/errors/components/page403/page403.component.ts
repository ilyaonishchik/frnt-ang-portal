import {Component, OnInit} from '@angular/core'
import {Location} from '@angular/common'
import {AppService} from '../../../../shared/services/app.service'

@Component({
  selector: 'app-page403',
  templateUrl: './page403.component.html',
  styleUrls: ['./page403.component.scss'],
})
export class Page403Component implements OnInit {
  constructor(public appService: AppService, private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back()
  }
}
