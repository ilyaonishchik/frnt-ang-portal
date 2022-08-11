import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {faRightToBracket, faUserPlus} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {
  constructor(libraryIcons: FaIconLibrary) {
    libraryIcons.addIcons(faRightToBracket, faUserPlus)
  }

  ngOnInit(): void {}
}
