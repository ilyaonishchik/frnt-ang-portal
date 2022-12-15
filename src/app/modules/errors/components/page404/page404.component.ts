import {Component} from '@angular/core'
import {Location} from '@angular/common'

import {environment} from 'environments/environment'

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component {
  projectTitle: string = environment.title

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back()
  }
}
