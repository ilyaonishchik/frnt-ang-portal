import {Component} from '@angular/core'

import {environment} from 'environments/environment'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent {
  projectTitle: string = environment.title
}
