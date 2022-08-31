import {Component, OnInit} from '@angular/core'
import {Location} from '@angular/common'

@Component({
  selector: 'app-page403',
  templateUrl: './page403.component.html',
  styleUrls: ['./page403.component.scss'],
})
export class Page403Component implements OnInit {
  constructor(private location: Location) {}

  ngOnInit(): void {}

  goBack(): void {
    this.location.back()
  }
}
