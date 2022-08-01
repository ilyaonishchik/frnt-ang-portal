import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons'
import {Location} from '@angular/common'

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
})
export class Page404Component implements OnInit {
  constructor(library: FaIconLibrary, private location: Location) {
    library.addIcons(faQuestionCircle)
  }

  ngOnInit(): void {}

  goBack(): void {
    this.location.back()
  }
}
