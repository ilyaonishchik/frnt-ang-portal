import {Component} from '@angular/core'
import {Location} from '@angular/common'

import {environment} from 'environments/environment'

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.scss'],
})
export class Page500Component {
  projectTitle: string = environment.title

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back()
  }
}
