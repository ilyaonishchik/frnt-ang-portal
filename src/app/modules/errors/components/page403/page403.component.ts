import {Component} from '@angular/core'
import {Location} from '@angular/common'

import {environment} from 'environments/environment'

@Component({
  selector: 'app-page403',
  templateUrl: './page403.component.html',
  styleUrls: ['./page403.component.scss'],
})
export class Page403Component {
  projectTitle: string = environment.title

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back()
  }
}
