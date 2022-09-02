import {Component, OnInit} from '@angular/core'
import {Location} from '@angular/common'
import {AppService} from '../../../../services/app.service'

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss'],
})
export class Page500Component implements OnInit {
  constructor(public appService: AppService, private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back()
  }
}
