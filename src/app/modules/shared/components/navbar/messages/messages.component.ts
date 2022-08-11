import {Component, OnInit} from '@angular/core'
import {FaIconLibrary} from '@fortawesome/angular-fontawesome'
import {faMessage} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  count = '99+'
  constructor(libraryIcons: FaIconLibrary) {
    libraryIcons.addIcons(faMessage)
  }

  ngOnInit(): void {}
}
